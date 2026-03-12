"use strict";
var AccountService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountService = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const account_detailed_1 = require("./entities/account.detailed");
const account_1 = require("./entities/account");
const vm_query_service_1 = require("../vm.query/vm.query.service");
const api_config_service_1 = require("../../common/api-config/api.config.service");
const account_key_1 = require("./entities/account.key");
const plugin_service_1 = require("../../common/plugins/plugin.service");
const account_dcdt_history_1 = require("./entities/account.dcdt.history");
const account_history_1 = require("./entities/account.history");
const stake_service_1 = require("../stake/stake.service");
const transfer_service_1 = require("../transfers/transfer.service");
const transaction_type_1 = require("../transactions/entities/transaction.type");
const assets_service_1 = require("../../common/assets/assets.service");
const transaction_filter_1 = require("../transactions/entities/transaction.filter");
const sdk_nestjs_cache_1 = require("@sravankumar02/sdk-nestjs-cache");
const sdk_nestjs_common_1 = require("@sravankumar02/sdk-nestjs-common");
const sdk_nestjs_http_1 = require("@sravankumar02/sdk-nestjs-http");
const gateway_service_1 = require("../../common/gateway/gateway.service");
const indexer_service_1 = require("../../common/indexer/indexer.service");
const cache_info_1 = require("../../utils/cache.info");
const concurrency_utils_1 = require("../../utils/concurrency.utils");
const username_service_1 = require("../usernames/username.service");
const contract_upgrades_1 = require("./entities/contract.upgrades");
const protocol_service_1 = require("../../common/protocol/protocol.service");
const provider_service_1 = require("../providers/provider.service");
const keys_service_1 = require("../keys/keys.service");
const node_status_1 = require("../nodes/entities/node.status");
const application_most_used_1 = require("./entities/application.most.used");
let AccountService = AccountService_1 = class AccountService {
    constructor(indexerService, gatewayService, cachingService, vmQueryService, apiConfigService, pluginService, stakeService, transferService, assetsService, usernameService, apiService, protocolService, providerService, keysService) {
        this.indexerService = indexerService;
        this.gatewayService = gatewayService;
        this.cachingService = cachingService;
        this.vmQueryService = vmQueryService;
        this.apiConfigService = apiConfigService;
        this.pluginService = pluginService;
        this.stakeService = stakeService;
        this.transferService = transferService;
        this.assetsService = assetsService;
        this.usernameService = usernameService;
        this.apiService = apiService;
        this.protocolService = protocolService;
        this.providerService = providerService;
        this.keysService = keysService;
        this.logger = new sdk_nestjs_common_1.OriginLogger(AccountService_1.name);
    }
    async getAccountsCount(filter) {
        if (!filter.isSet()) {
            return await this.cachingService.getOrSet(cache_info_1.CacheInfo.AccountsCount.key, async () => await this.indexerService.getAccountsCount(filter), cache_info_1.CacheInfo.AccountsCount.ttl);
        }
        return await this.indexerService.getAccountsCount(filter);
    }
    async getAccount(address, options) {
        if (!sdk_nestjs_common_1.AddressUtils.isAddressValid(address)) {
            return null;
        }
        const account = await this.getAccountRaw(address, options === null || options === void 0 ? void 0 : options.withAssets);
        if (!account) {
            return null;
        }
        if ((options === null || options === void 0 ? void 0 : options.withTxCount) === true) {
            account.txCount = await this.getAccountTxCount(address);
        }
        if ((options === null || options === void 0 ? void 0 : options.withScrCount) === true) {
            account.scrCount = await this.getAccountScResults(address);
        }
        if ((options === null || options === void 0 ? void 0 : options.withGuardianInfo) === true) {
            await this.applyGuardianInfo(account);
        }
        if (options === null || options === void 0 ? void 0 : options.withTimestamp) {
            const elasticSearchAccount = await this.indexerService.getAccount(address);
            account.timestamp = elasticSearchAccount.timestamp;
            if (elasticSearchAccount.timestampMs) {
                account.timestampMs = elasticSearchAccount.timestampMs;
            }
        }
        if (sdk_nestjs_common_1.AddressUtils.isSmartContractAddress(address)) {
            const provider = await this.providerService.getProvider(address);
            if (provider && provider.owner) {
                account.ownerAddress = provider.owner;
            }
        }
        return account;
    }
    async applyGuardianInfo(account) {
        try {
            const guardianResult = await this.gatewayService.getGuardianData(account.address);
            const guardianData = guardianResult === null || guardianResult === void 0 ? void 0 : guardianResult.guardianData;
            if (guardianData) {
                const activeGuardian = guardianData.activeGuardian;
                if (activeGuardian) {
                    account.activeGuardianActivationEpoch = activeGuardian.activationEpoch;
                    account.activeGuardianAddress = activeGuardian.address;
                    account.activeGuardianServiceUid = activeGuardian.serviceUID;
                }
                const pendingGuardian = guardianData.pendingGuardian;
                if (pendingGuardian) {
                    account.pendingGuardianActivationEpoch = pendingGuardian.activationEpoch;
                    account.pendingGuardianAddress = pendingGuardian.address;
                    account.pendingGuardianServiceUid = pendingGuardian.serviceUID;
                }
                account.isGuarded = guardianData.guarded;
            }
        }
        catch (error) {
            this.logger.error(`Error when getting guardian data for address '${account.address}'`);
            this.logger.error(error);
        }
    }
    async getAccountVerification(address) {
        if (!sdk_nestjs_common_1.AddressUtils.isAddressValid(address)) {
            return null;
        }
        const verificationResponse = await this.apiService.get(`${this.apiConfigService.getVerifierUrl()}/verifier/${address}`);
        return verificationResponse.data;
    }
    async getVerifiedAccounts() {
        const verificationResponse = await this.apiService.get(`${this.apiConfigService.getVerifierUrl()}/verifier`);
        return verificationResponse.data;
    }
    async getAccountSimple(address) {
        if (!sdk_nestjs_common_1.AddressUtils.isAddressValid(address)) {
            return null;
        }
        return await this.getAccountRaw(address);
    }
    async getAccountRaw(address, withAssets) {
        var _a;
        try {
            const { account: { nonce, balance, code, codeHash, rootHash, developerReward, ownerAddress, codeMetadata }, } = await this.gatewayService.getAddressDetails(address);
            const shardCount = await this.protocolService.getShardCount();
            const shard = sdk_nestjs_common_1.AddressUtils.computeShard(sdk_nestjs_common_1.AddressUtils.bech32Decode(address), shardCount);
            let account = new account_detailed_1.AccountDetailed({ address, nonce, balance, code, codeHash, rootHash, shard, developerReward, ownerAddress, scamInfo: undefined, nftCollections: undefined, nfts: undefined });
            if (withAssets === true) {
                const assets = await this.assetsService.getAllAccountAssets();
                account.assets = assets[address];
                account.ownerAssets = assets[ownerAddress];
            }
            const codeAttributes = sdk_nestjs_common_1.AddressUtils.decodeCodeMetadata(codeMetadata);
            if (codeAttributes) {
                account = Object.assign(Object.assign({}, account), codeAttributes);
            }
            if (sdk_nestjs_common_1.AddressUtils.isSmartContractAddress(address) && account.code) {
                const [deployTxHash, deployedAt, isVerified] = await Promise.all([
                    this.getAccountDeployedTxHash(address),
                    this.getAccountDeployedAt(address),
                    this.getAccountIsVerified(address, account.codeHash),
                ]);
                if (deployTxHash) {
                    account.deployTxHash = deployTxHash;
                }
                if (deployedAt) {
                    account.deployedAt = deployedAt;
                }
                if (isVerified) {
                    account.isVerified = isVerified;
                }
            }
            if (!sdk_nestjs_common_1.AddressUtils.isSmartContractAddress(address)) {
                account.username = (_a = await this.usernameService.getUsernameForAddress(address)) !== null && _a !== void 0 ? _a : undefined;
                account.isPayableBySmartContract = undefined;
                account.isUpgradeable = undefined;
                account.isReadable = undefined;
                account.isPayable = undefined;
            }
            await this.pluginService.processAccount(account);
            return account;
        }
        catch (error) {
            this.logger.error(error);
            this.logger.error(`Error when getting account details for address '${address}'`);
            return null;
        }
    }
    async getAccountTxCount(address) {
        return await this.transferService.getTransfersCount(new transaction_filter_1.TransactionFilter({ address, type: transaction_type_1.TransactionType.Transaction }));
    }
    async getAccountScResults(address) {
        return await this.transferService.getTransfersCount(new transaction_filter_1.TransactionFilter({ address, type: transaction_type_1.TransactionType.SmartContractResult }));
    }
    async getAccountDeployedAt(address) {
        return await this.cachingService.getOrSet(cache_info_1.CacheInfo.AccountDeployedAt(address).key, async () => await this.getAccountDeployedAtRaw(address), cache_info_1.CacheInfo.AccountDeployedAt(address).ttl);
    }
    async getAccountDeployedAtRaw(address) {
        const scDeploy = await this.indexerService.getScDeploy(address);
        if (!scDeploy) {
            return null;
        }
        const txHash = scDeploy.deployTxHash;
        if (!txHash) {
            return null;
        }
        const transaction = await this.indexerService.getTransaction(txHash);
        if (!transaction) {
            return null;
        }
        return transaction.timestamp;
    }
    async getAccountDeployedTxHash(address) {
        return await this.cachingService.getOrSet(cache_info_1.CacheInfo.AccountDeployTxHash(address).key, async () => await this.getAccountDeployedTxHashRaw(address), cache_info_1.CacheInfo.AccountDeployTxHash(address).ttl);
    }
    async getAccountDeployedTxHashRaw(address) {
        const scDeploy = await this.indexerService.getScDeploy(address);
        if (!scDeploy) {
            return null;
        }
        return scDeploy.deployTxHash;
    }
    async getAccountIsVerified(address, codeHash) {
        return await this.cachingService.getOrSet(cache_info_1.CacheInfo.AccountIsVerified(address).key, async () => await this.getAccountIsVerifiedRaw(address, codeHash), cache_info_1.CacheInfo.AccountIsVerified(address).ttl);
    }
    async getAccountIsVerifiedRaw(address, codeHash) {
        try {
            const { data } = await this.apiService.get(`${this.apiConfigService.getVerifierUrl()}/verifier/${address}/codehash`, undefined, async (error) => { var _a; return ((_a = error.response) === null || _a === void 0 ? void 0 : _a.status) === common_1.HttpStatus.NOT_FOUND; });
            if (data.codeHash === Buffer.from(codeHash, 'base64').toString('hex')) {
                return true;
            }
        }
        catch (_a) {
        }
        return null;
    }
    async getAccounts(queryPagination, filter) {
        if (!filter.isSet()) {
            return await this.cachingService.getOrSet(cache_info_1.CacheInfo.Accounts(queryPagination).key, async () => await this.getAccountsRaw(queryPagination, filter), cache_info_1.CacheInfo.Accounts(queryPagination).ttl);
        }
        return await this.getAccountsRaw(queryPagination, filter);
    }
    async getAccountsForAddresses(addresses) {
        const assets = await this.assetsService.getAllAccountAssets();
        const accountsRaw = await this.indexerService.getAccountsForAddresses(addresses);
        const accounts = accountsRaw.map(account => sdk_nestjs_http_1.ApiUtils.mergeObjects(new account_1.Account(), account));
        const shardCount = await this.protocolService.getShardCount();
        for (const account of accounts) {
            account.shard = sdk_nestjs_common_1.AddressUtils.computeShard(sdk_nestjs_common_1.AddressUtils.bech32Decode(account.address), shardCount);
            account.assets = assets[account.address];
        }
        return accounts;
    }
    async getAccountsRaw(queryPagination, options) {
        const result = await this.indexerService.getAccounts(queryPagination, options);
        const assets = await this.assetsService.getAllAccountAssets();
        const accounts = result.map(item => {
            const account = sdk_nestjs_http_1.ApiUtils.mergeObjects(new account_1.Account(), item);
            account.ownerAddress = item.currentOwner;
            account.transfersLast24h = item.api_transfersLast24h;
            return account;
        });
        const shardCount = await this.protocolService.getShardCount();
        const verifiedAccounts = await this.cachingService.get(cache_info_1.CacheInfo.VerifiedAccounts.key);
        if (options.addresses && options.addresses.length > 0) {
            const gatewayResponse = await this.gatewayService.getAccountsBulk(options.addresses);
            const finalAccounts = {};
            for (const address in gatewayResponse) {
                if (gatewayResponse.hasOwnProperty(address)) {
                    finalAccounts[address] = gatewayResponse[address];
                }
            }
            for (const account of accounts) {
                const gatewayAccount = finalAccounts[account.address];
                if (gatewayAccount) {
                    account.balance = gatewayAccount.balance;
                }
            }
        }
        await concurrency_utils_1.ConcurrencyUtils.executeWithConcurrencyLimit(accounts, async (account) => {
            account.shard = sdk_nestjs_common_1.AddressUtils.computeShard(sdk_nestjs_common_1.AddressUtils.bech32Decode(account.address), shardCount);
            account.assets = assets[account.address];
            if (options.withDeployInfo && sdk_nestjs_common_1.AddressUtils.isSmartContractAddress(account.address)) {
                const [deployedAt, deployTxHash] = await Promise.all([
                    this.getAccountDeployedAt(account.address),
                    this.getAccountDeployedTxHash(account.address),
                ]);
                account.deployedAt = deployedAt;
                account.deployTxHash = deployTxHash;
            }
            if (options.withTxCount) {
                account.txCount = await this.getAccountTxCount(account.address);
            }
            if (options.withScrCount) {
                account.scrCount = await this.getAccountScResults(account.address);
            }
            if (options.withOwnerAssets && account.ownerAddress) {
                account.ownerAssets = assets[account.ownerAddress];
            }
            if (verifiedAccounts && verifiedAccounts.includes(account.address)) {
                account.isVerified = true;
            }
        }, 6, 'AccountService.getAccountsRaw');
        return accounts;
    }
    async getDeferredAccount(address) {
        const publicKey = sdk_nestjs_common_1.AddressUtils.bech32Decode(address);
        const delegationContractAddress = this.apiConfigService.getDelegationContractAddress();
        if (!delegationContractAddress) {
            return [];
        }
        const delegationContractShardId = sdk_nestjs_common_1.AddressUtils.computeShard(sdk_nestjs_common_1.AddressUtils.bech32Decode(delegationContractAddress), await this.protocolService.getShardCount());
        const [encodedUserDeferredPaymentList, [encodedNumBlocksBeforeUnBond], { drt_nonce, },] = await Promise.all([
            this.vmQueryService.vmQuery(delegationContractAddress, 'getUserDeferredPaymentList', undefined, [publicKey]),
            this.vmQueryService.vmQuery(delegationContractAddress, 'getNumBlocksBeforeUnBond'),
            this.gatewayService.getNetworkStatus(`${delegationContractShardId}`),
        ]);
        const numBlocksBeforeUnBond = parseInt(sdk_nestjs_common_1.BinaryUtils.base64ToBigInt(encodedNumBlocksBeforeUnBond).toString());
        const drtNonce = drt_nonce;
        const data = encodedUserDeferredPaymentList.reduce((result, _, index, array) => {
            if (index % 2 === 0) {
                const [encodedDeferredPayment, encodedUnstakedNonce] = array.slice(index, index + 2);
                const deferredPayment = sdk_nestjs_common_1.BinaryUtils.base64ToBigInt(encodedDeferredPayment).toString();
                const unstakedNonce = parseInt(sdk_nestjs_common_1.BinaryUtils.base64ToBigInt(encodedUnstakedNonce).toString());
                const blocksLeft = Math.max(0, unstakedNonce + numBlocksBeforeUnBond - drtNonce);
                const secondsLeft = blocksLeft * 6;
                result.push({ deferredPayment, secondsLeft });
            }
            return result;
        }, []);
        return data;
    }
    async getBlsKeysStatusForPublicKey(publicKey) {
        const auctionContractAddress = this.apiConfigService.getAuctionContractAddress();
        if (!auctionContractAddress) {
            return undefined;
        }
        return await this.vmQueryService.vmQuery(auctionContractAddress, 'getBlsKeysStatus', auctionContractAddress, [publicKey]);
    }
    async getRewardAddressForNode(blsKey) {
        const stakingContractAddress = this.apiConfigService.getStakingContractAddress();
        if (!stakingContractAddress) {
            return '';
        }
        const [encodedRewardsPublicKey] = await this.vmQueryService.vmQuery(stakingContractAddress, 'getRewardAddress', undefined, [blsKey]);
        const rewardsPublicKey = Buffer.from(encodedRewardsPublicKey, 'base64').toString();
        return sdk_nestjs_common_1.AddressUtils.bech32Encode(rewardsPublicKey);
    }
    async getAllNodeStates(address) {
        return await this.vmQueryService.vmQuery(address, 'getAllNodeStates');
    }
    async getKeys(address, filter, pagination) {
        const { from, size } = pagination;
        const publicKey = sdk_nestjs_common_1.AddressUtils.bech32Decode(address);
        const isStakingProvider = await this.providerService.isProvider(address);
        let notStakedNodes = [];
        if (isStakingProvider) {
            const allNodeStates = await this.getAllNodeStates(address);
            const inactiveNodesBuffers = this.getInactiveNodesBuffers(allNodeStates);
            notStakedNodes = this.createNotStakedNodes(inactiveNodesBuffers);
        }
        const blsKeysStatus = await this.getBlsKeysStatusForPublicKey(publicKey);
        let nodes = [];
        if (blsKeysStatus) {
            nodes = this.createAccountKeys(blsKeysStatus);
            await this.applyRewardAddressAndTopUpToNodes(nodes, address);
            await this.applyNodeUnbondingPeriods(nodes);
            await this.updateQueuedNodes(nodes);
        }
        let filteredNodes = [...notStakedNodes, ...nodes];
        if (filter && filter.status && filter.status.length > 0) {
            filteredNodes = filteredNodes.filter(node => filter.status.includes(node.status));
            filteredNodes = this.sortNodesByStatus(filteredNodes, filter.status);
        }
        return filteredNodes.slice(from, from + size);
    }
    getInactiveNodesBuffers(allNodeStates) {
        if (!allNodeStates) {
            return [];
        }
        const checkIfCurrentItemIsStatus = (currentNodeData) => Object.values(node_status_1.NodeStatusRaw).includes(currentNodeData);
        return allNodeStates.reduce((totalNodes, currentNodeState, nodeIndex, allNodesDataArray) => {
            const decodedData = Buffer.from(currentNodeState, 'base64').toString();
            const isNotStakedStatus = decodedData === node_status_1.NodeStatusRaw.notStaked;
            const isCurrentItemTheStatus = checkIfCurrentItemIsStatus(decodedData);
            const nextStatusItemIndex = allNodesDataArray.findIndex((nodeData, nodeDataIndex) => nodeIndex < nodeDataIndex
                ? checkIfCurrentItemIsStatus(Buffer.from(nodeData, 'base64').toString())
                : false);
            if (isCurrentItemTheStatus && nextStatusItemIndex < 0 && isNotStakedStatus) {
                return [...totalNodes, ...allNodesDataArray.slice(nodeIndex + 1)];
            }
            if (isCurrentItemTheStatus && isNotStakedStatus) {
                return [...totalNodes, ...allNodesDataArray.slice(nodeIndex + 1, nextStatusItemIndex)];
            }
            return totalNodes;
        }, []);
    }
    createNotStakedNodes(inactiveNodesBuffers) {
        return inactiveNodesBuffers.map((inactiveNodeBuffer) => {
            const accountKey = new account_key_1.AccountKey();
            accountKey.blsKey = sdk_nestjs_common_1.BinaryUtils.padHex(Buffer.from(inactiveNodeBuffer, 'base64').toString('hex'));
            accountKey.status = node_status_1.NodeStatusRaw.notStaked;
            accountKey.stake = '2500000000000000000000';
            return accountKey;
        });
    }
    createAccountKeys(blsKeysStatus) {
        const nodes = [];
        for (let index = 0; index < blsKeysStatus.length; index += 2) {
            const [encodedBlsKey, encodedStatus] = blsKeysStatus.slice(index, index + 2);
            const accountKey = new account_key_1.AccountKey();
            accountKey.blsKey = sdk_nestjs_common_1.BinaryUtils.padHex(Buffer.from(encodedBlsKey, 'base64').toString('hex'));
            accountKey.status = Buffer.from(encodedStatus, 'base64').toString();
            accountKey.stake = '2500000000000000000000';
            nodes.push(accountKey);
        }
        return nodes;
    }
    sortNodesByStatus(nodes, status) {
        return nodes.sorted(node => {
            const statusIndex = status.indexOf(node.status);
            return statusIndex === -1 ? status.length : statusIndex;
        });
    }
    async applyRewardAddressAndTopUpToNodes(nodes, address) {
        if (nodes.length) {
            const rewardAddress = await this.getRewardAddressForNode(nodes[0].blsKey);
            const { topUp } = await this.stakeService.getAllStakesForNode(address);
            for (const node of nodes) {
                node.rewardAddress = rewardAddress;
                node.topUp = topUp;
                node.remainingUnBondPeriod = undefined;
            }
        }
    }
    async updateQueuedNodes(nodes) {
        const stakingContractAddress = this.apiConfigService.getStakingContractAddress();
        if (!stakingContractAddress) {
            return;
        }
        const queuedNodes = nodes
            .filter((node) => node.status === 'queued')
            .map(({ blsKey }) => blsKey);
        if (queuedNodes.length) {
            const [queueSizeEncoded] = await this.vmQueryService.vmQuery(stakingContractAddress, 'getQueueSize');
            if (queueSizeEncoded) {
                const queueSize = Buffer.from(queueSizeEncoded, 'base64').toString();
                const queueIndexes = await Promise.all(queuedNodes.map((blsKey) => this.vmQueryService.vmQuery(stakingContractAddress, 'getQueueIndex', this.apiConfigService.getAuctionContractAddress(), [blsKey])));
                let index = 0;
                for (const queueIndexEncoded of queueIndexes) {
                    if (queueIndexEncoded) {
                        const [found] = nodes.filter((x) => x.blsKey === queuedNodes[index]);
                        found.queueIndex = Buffer.from(queueIndexEncoded[0], 'base64').toString();
                        found.queueSize = queueSize;
                        index++;
                    }
                }
            }
        }
    }
    async getAccountDeploys(pagination, address) {
        const accountDeployedContracts = await this.indexerService.getAccountDeploys(pagination, address);
        const assets = await this.assetsService.getAllAccountAssets();
        const accounts = accountDeployedContracts.map(contract => ({
            address: contract.contract,
            deployTxHash: contract.deployTxHash,
            timestamp: contract.timestamp,
            assets: assets[contract.contract],
        }));
        return accounts;
    }
    async getAccountDeploysCount(address) {
        return await this.indexerService.getAccountDeploysCount(address);
    }
    async getAccountContracts(pagination, address) {
        const accountContracts = await this.indexerService.getAccountContracts(pagination, address);
        const assets = await this.assetsService.getAllAccountAssets();
        const accounts = accountContracts.map(contract => ({
            address: contract.contract,
            deployTxHash: contract.deployTxHash,
            timestamp: contract.timestamp,
            assets: assets[contract.contract],
        }));
        return accounts;
    }
    async getAccountContractsCount(address) {
        return await this.indexerService.getAccountContractsCount(address);
    }
    async getContractUpgrades(queryPagination, address) {
        const details = await this.indexerService.getScDeploy(address);
        if (!details) {
            return [];
        }
        const upgrades = details.upgrades.map(item => sdk_nestjs_http_1.ApiUtils.mergeObjects(new contract_upgrades_1.ContractUpgrades(), {
            address: item.upgrader,
            txHash: item.upgradeTxHash,
            codeHash: item.codeHash,
            timestamp: item.timestamp,
        })).sortedDescending(item => item.timestamp);
        return upgrades.slice(queryPagination.from, queryPagination.from + queryPagination.size);
    }
    async getAccountHistory(address, pagination, filter) {
        const elasticResult = await this.indexerService.getAccountHistory(address, pagination, filter);
        return elasticResult.map(item => sdk_nestjs_http_1.ApiUtils.mergeObjects(new account_history_1.AccountHistory(), item));
    }
    async getAccountHistoryCount(address, filter) {
        return await this.indexerService.getAccountHistoryCount(address, filter);
    }
    async getAccountTokenHistoryCount(address, tokenIdentifier, filter) {
        return await this.indexerService.getAccountTokenHistoryCount(address, tokenIdentifier, filter);
    }
    async getAccountTokenHistory(address, tokenIdentifier, pagination, filter) {
        const elasticResult = await this.indexerService.getAccountTokenHistory(address, tokenIdentifier, pagination, filter);
        return elasticResult.map(item => sdk_nestjs_http_1.ApiUtils.mergeObjects(new account_dcdt_history_1.AccountDcdtHistory(), item));
    }
    async getAccountDcdtHistory(address, pagination, filter) {
        const elasticResult = await this.indexerService.getAccountDcdtHistory(address, pagination, filter);
        return elasticResult.map(item => sdk_nestjs_http_1.ApiUtils.mergeObjects(new account_dcdt_history_1.AccountDcdtHistory(), item));
    }
    async getAccountDcdtHistoryCount(address, filter) {
        return await this.indexerService.getAccountDcdtHistoryCount(address, filter);
    }
    async applyNodeUnbondingPeriods(nodes) {
        const leavingNodes = nodes.filter(node => node.status === 'unStaked');
        await Promise.all(leavingNodes.map(async (node) => {
            const keyUnbondPeriod = await this.keysService.getKeyUnbondPeriod(node.blsKey);
            node.remainingUnBondPeriod = keyUnbondPeriod === null || keyUnbondPeriod === void 0 ? void 0 : keyUnbondPeriod.remainingUnBondPeriod;
        }));
    }
    async getApplicationMostUsed() {
        return await this.cachingService.getOrSet(cache_info_1.CacheInfo.ApplicationMostUsed.key, async () => await this.getApplicationMostUsedRaw(), cache_info_1.CacheInfo.ApplicationMostUsed.ttl);
    }
    async getApplicationMostUsedRaw() {
        const transfersLast24hUrl = this.apiConfigService.getAccountExtraDetailsTransfersLast24hUrl();
        if (!transfersLast24hUrl) {
            throw new Error('Transfers last 24h URL is not set');
        }
        const { data: mostUsedApplications } = await this.apiService.get(transfersLast24hUrl);
        return mostUsedApplications.map((item) => new application_most_used_1.ApplicationMostUsed({
            address: item.key,
            transfers24H: item.value,
        }));
    }
};
AccountService = AccountService_1 = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(5, (0, common_1.Inject)((0, common_1.forwardRef)(() => plugin_service_1.PluginService))),
    tslib_1.__param(6, (0, common_1.Inject)((0, common_1.forwardRef)(() => stake_service_1.StakeService))),
    tslib_1.__param(7, (0, common_1.Inject)((0, common_1.forwardRef)(() => transfer_service_1.TransferService))),
    tslib_1.__param(12, (0, common_1.Inject)((0, common_1.forwardRef)(() => provider_service_1.ProviderService))),
    tslib_1.__metadata("design:paramtypes", [indexer_service_1.IndexerService,
        gateway_service_1.GatewayService,
        sdk_nestjs_cache_1.CacheService,
        vm_query_service_1.VmQueryService,
        api_config_service_1.ApiConfigService,
        plugin_service_1.PluginService,
        stake_service_1.StakeService,
        transfer_service_1.TransferService,
        assets_service_1.AssetsService,
        username_service_1.UsernameService,
        sdk_nestjs_http_1.ApiService,
        protocol_service_1.ProtocolService,
        provider_service_1.ProviderService,
        keys_service_1.KeysService])
], AccountService);
exports.AccountService = AccountService;
//# sourceMappingURL=account.service.js.map