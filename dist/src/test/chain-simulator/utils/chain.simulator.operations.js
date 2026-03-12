"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transferRewa = exports.transferNftFromTo = exports.TransferNftArgs = exports.transferNft = exports.issueMultipleMetaDCDTCollections = exports.IssueNftArgs = exports.issueMultipleNftsCollections = exports.issueSftCollection = exports.issueNftCollection = exports.issueCollection = exports.DeployScArgs = exports.TransferDcdtArgs = exports.IssueDcdtArgs = exports.SendTransactionArgs = exports.issueMultipleDcdts = exports.sendTransaction = exports.transferDcdt = exports.issueDcdt = exports.deploySc = exports.getNonce = exports.fundAddress = void 0;
const tslib_1 = require("tslib");
const axios_1 = tslib_1.__importDefault(require("axios"));
const sdk_nestjs_common_1 = require("@sravankumar02/sdk-nestjs-common");
const VM_TYPE = '0500';
const CODE_METADATA = '0100';
const SC_DEPLOY_ADDRESS = 'drt1qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq85hk5z';
const DCDT_ADDRESS = 'drt1qqqqqqqqqqqqqqqpqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqzllls6prdez';
async function fundAddress(chainSimulatorUrl, address) {
    const payload = [
        {
            address: address,
            balance: '100000000000000000000000',
        },
    ];
    await axios_1.default.post(`${chainSimulatorUrl}/simulator/set-state`, payload);
}
exports.fundAddress = fundAddress;
async function getNonce(chainSimulatorUrl, address) {
    try {
        const currentNonceResponse = await axios_1.default.get(`${chainSimulatorUrl}/address/${address}/nonce`);
        return currentNonceResponse.data.data.nonce;
    }
    catch (e) {
        console.error(e);
        return 0;
    }
}
exports.getNonce = getNonce;
async function deploySc(args) {
    var _a, _b, _c, _d, _e;
    try {
        const contractCodeHex = Buffer.from(args.contractCodeRaw).toString('hex');
        const contractArgs = [VM_TYPE, CODE_METADATA, ...args.hexArguments];
        const contractPayload = contractCodeHex + '@' + contractArgs.join('@');
        const txHash = await sendTransaction(new SendTransactionArgs({
            chainSimulatorUrl: args.chainSimulatorUrl,
            sender: args.deployer,
            receiver: SC_DEPLOY_ADDRESS,
            dataField: contractPayload,
        }));
        const txResponse = await axios_1.default.get(`${args.chainSimulatorUrl}/transaction/${txHash}?withResults=true`);
        const scDeployLog = (_e = (_d = (_c = (_b = (_a = txResponse === null || txResponse === void 0 ? void 0 : txResponse.data) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.transaction) === null || _c === void 0 ? void 0 : _c.logs) === null || _d === void 0 ? void 0 : _d.events) === null || _e === void 0 ? void 0 : _e.find((event) => event.identifier === 'SCDeploy');
        console.log(`Deployed SC. tx hash: ${txHash}. address: ${scDeployLog === null || scDeployLog === void 0 ? void 0 : scDeployLog.address}`);
        return scDeployLog === null || scDeployLog === void 0 ? void 0 : scDeployLog.address;
    }
    catch (e) {
        console.error(e);
        return 'n/a';
    }
}
exports.deploySc = deploySc;
async function issueDcdt(args) {
    var _a, _b, _c, _d, _e;
    const txHash = await sendTransaction(new SendTransactionArgs({
        chainSimulatorUrl: args.chainSimulatorUrl,
        sender: args.issuer,
        receiver: DCDT_ADDRESS,
        dataField: `issue@${Buffer.from(args.tokenName).toString('hex')}@${Buffer.from(args.tokenTicker).toString('hex')}@1e9b0e04e39e5845000000@12`,
        value: '50000000000000000',
    }));
    const txResponse = await axios_1.default.get(`${args.chainSimulatorUrl}/transaction/${txHash}?withResults=true`);
    const dcdtIssueLog = (_e = (_d = (_c = (_b = (_a = txResponse === null || txResponse === void 0 ? void 0 : txResponse.data) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.transaction) === null || _c === void 0 ? void 0 : _c.logs) === null || _d === void 0 ? void 0 : _d.events) === null || _e === void 0 ? void 0 : _e.find((event) => event.identifier === 'issue');
    const tokenIdentifier = Buffer.from(dcdtIssueLog.topics[0], 'base64').toString();
    console.log(`Issued token with ticker ${args.tokenTicker}. tx hash: ${txHash}. identifier: ${tokenIdentifier}`);
    return tokenIdentifier;
}
exports.issueDcdt = issueDcdt;
async function transferDcdt(args) {
    const transferValue = args.plainAmountOfTokens * 10 ** 18;
    console.log(`Transferring ${args.plainAmountOfTokens} ${args.tokenIdentifier} from ${args.sender} to ${args.receiver}`);
    let hexAmountOfTokens = transferValue.toString(16);
    if (hexAmountOfTokens.length % 2 !== 0) {
        hexAmountOfTokens = '0' + hexAmountOfTokens;
    }
    const txHash = await sendTransaction(new SendTransactionArgs({
        chainSimulatorUrl: args.chainSimulatorUrl,
        sender: args.sender,
        receiver: args.receiver,
        dataField: `DCDTTransfer@${Buffer.from(args.tokenIdentifier).toString('hex')}@${hexAmountOfTokens}`,
        value: '0',
    }));
    console.log(`DCDT transfer completed. Transaction hash: ${txHash}`);
    return txHash;
}
exports.transferDcdt = transferDcdt;
async function sendTransaction(args) {
    var _a, _b;
    try {
        const nonce = await getNonce(args.chainSimulatorUrl, args.sender);
        const tx = {
            sender: args.sender,
            receiver: args.receiver,
            nonce: nonce + ((_a = args.nonceOffset) !== null && _a !== void 0 ? _a : 0),
            value: args.value,
            gasPrice: 1000000000,
            gasLimit: (_b = args.gasLimit) !== null && _b !== void 0 ? _b : (50000 + 1500 * args.dataField.length),
            data: Buffer.from(args.dataField).toString('base64'),
            signature: 'a'.repeat(128),
            chainID: 'chain',
            version: 1,
        };
        const txHashResponse = await axios_1.default.post(`${args.chainSimulatorUrl}/transaction/send`, tx);
        const txHash = txHashResponse.data.data.txHash;
        if (args.nonceOffset) {
            console.log(`Broadcasted tx hash ${txHash} of sender ${args.sender} with nonce ${tx.nonce}`);
            console.log(JSON.stringify(tx));
            await axios_1.default.post(`${args.chainSimulatorUrl}/simulator/generate-blocks/1`);
            return txHash;
        }
        await axios_1.default.post(`${args.chainSimulatorUrl}/simulator/generate-blocks-until-transaction-processed/${txHash}`);
        return txHash;
    }
    catch (e) {
        console.error(e);
        return 'n/a';
    }
}
exports.sendTransaction = sendTransaction;
async function issueMultipleDcdts(chainSimulatorUrl, issuer, numTokens) {
    const tokenIdentifiers = [];
    for (let i = 1; i <= numTokens; i++) {
        const tokenName = `Token${i}`;
        const tokenTicker = `TKN${i}`;
        const tokenIdentifier = await issueDcdt(new IssueDcdtArgs({
            chainSimulatorUrl,
            issuer,
            tokenName,
            tokenTicker,
        }));
        tokenIdentifiers.push(tokenIdentifier);
    }
    return tokenIdentifiers;
}
exports.issueMultipleDcdts = issueMultipleDcdts;
class SendTransactionArgs {
    constructor(options = {}) {
        this.chainSimulatorUrl = '';
        this.sender = '';
        this.receiver = '';
        this.dataField = '';
        this.value = '0';
        this.gasLimit = 100000000;
        this.nonceOffset = 0;
        Object.assign(this, options);
    }
}
exports.SendTransactionArgs = SendTransactionArgs;
class IssueDcdtArgs {
    constructor(options = {}) {
        this.chainSimulatorUrl = '';
        this.issuer = '';
        this.tokenName = '';
        this.tokenTicker = '';
        Object.assign(this, options);
    }
}
exports.IssueDcdtArgs = IssueDcdtArgs;
class TransferDcdtArgs {
    constructor(options = {}) {
        this.chainSimulatorUrl = '';
        this.sender = '';
        this.receiver = '';
        this.tokenIdentifier = '';
        this.plainAmountOfTokens = 1;
        Object.assign(this, options);
    }
}
exports.TransferDcdtArgs = TransferDcdtArgs;
class DeployScArgs {
    constructor(options = {}) {
        this.chainSimulatorUrl = '';
        this.deployer = '';
        this.contractCodeRaw = Buffer.from('');
        this.hexArguments = [];
        Object.assign(this, options);
    }
}
exports.DeployScArgs = DeployScArgs;
async function issueCollection(args, type) {
    var _a, _b, _c, _d, _e;
    const properties = [
        'canFreeze',
        'canWipe',
        'canPause',
        'canTransferNFTCreateRole',
        'canChangeOwner',
        'canUpgrade',
        'canAddSpecialRoles',
    ];
    const dataFields = [
        `issue${type}`,
        Buffer.from(args.tokenName).toString('hex'),
        Buffer.from(args.tokenTicker).toString('hex'),
    ];
    for (const prop of properties) {
        dataFields.push(Buffer.from(prop).toString('hex'));
        dataFields.push(Buffer.from('true').toString('hex'));
    }
    const txHash = await sendTransaction(new SendTransactionArgs({
        chainSimulatorUrl: args.chainSimulatorUrl,
        sender: args.issuer,
        receiver: DCDT_ADDRESS,
        dataField: dataFields.join('@'),
        value: '50000000000000000',
        gasLimit: 60000000,
    }));
    const txResponse = await axios_1.default.get(`${args.chainSimulatorUrl}/transaction/${txHash}?withResults=true`);
    const issueLog = (_e = (_d = (_c = (_b = (_a = txResponse === null || txResponse === void 0 ? void 0 : txResponse.data) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.transaction) === null || _c === void 0 ? void 0 : _c.logs) === null || _d === void 0 ? void 0 : _d.events) === null || _e === void 0 ? void 0 : _e.find((event) => event.identifier === `issue${type}`);
    const tokenIdentifier = Buffer.from(issueLog.topics[0], 'base64').toString();
    console.log(`Issued ${type} collection with ticker ${args.tokenTicker}. tx hash: ${txHash}. identifier: ${tokenIdentifier}`);
    return tokenIdentifier;
}
exports.issueCollection = issueCollection;
async function issueNftCollection(args) {
    return await issueCollection(args, 'NonFungible');
}
exports.issueNftCollection = issueNftCollection;
async function issueSftCollection(args) {
    return await issueCollection(args, 'SemiFungible');
}
exports.issueSftCollection = issueSftCollection;
async function issueMultipleNftsCollections(chainSimulatorUrl, issuer, numCollections, numNfts, collectionType = 'nft') {
    var _a, _b, _c, _d, _e, _f;
    const nftCollectionIdentifiers = [];
    for (let i = 1; i <= numCollections; i++) {
        if (collectionType === 'nft' || collectionType === 'both') {
            const nftTokenName = `NFTCollection${i}`;
            const nftTokenTicker = `NFT${i}`;
            const nftTokenIdentifier = await issueNftCollection(new IssueNftArgs({
                chainSimulatorUrl,
                issuer,
                tokenName: nftTokenName,
                tokenTicker: nftTokenTicker,
            }));
            nftCollectionIdentifiers.push({ identifier: nftTokenIdentifier, type: 'nft' });
        }
        if (collectionType === 'sft' || collectionType === 'both') {
            const sftTokenName = `SFTCollection${i}`;
            const sftTokenTicker = `SFT${i}`;
            const sftTokenIdentifier = await issueSftCollection(new IssueNftArgs({
                chainSimulatorUrl,
                issuer,
                tokenName: sftTokenName,
                tokenTicker: sftTokenTicker,
            }));
            nftCollectionIdentifiers.push({ identifier: sftTokenIdentifier, type: 'sft' });
        }
    }
    await new Promise(resolve => setTimeout(resolve, 5000));
    for (const { identifier: tokenIdentifier, type } of nftCollectionIdentifiers) {
        const roles = [];
        if (type === 'sft') {
            roles.push(Buffer.from('DCDTRoleNFTCreate').toString('hex'), Buffer.from('DCDTRoleNFTBurn').toString('hex'), Buffer.from('DCDTRoleNFTAddQuantity').toString('hex'), Buffer.from('DCDTTransferRole').toString('hex'));
        }
        else {
            roles.push(Buffer.from('DCDTRoleNFTCreate').toString('hex'), Buffer.from('DCDTRoleNFTBurn').toString('hex'), Buffer.from('DCDTRoleNFTUpdateAttributes').toString('hex'), Buffer.from('DCDTRoleNFTAddURI').toString('hex'), Buffer.from('DCDTTransferRole').toString('hex'));
        }
        const dataFields = [
            'setSpecialRole',
            Buffer.from(tokenIdentifier).toString('hex'),
            sdk_nestjs_common_1.AddressUtils.bech32Decode(issuer),
            ...roles,
        ];
        const txHash = await sendTransaction(new SendTransactionArgs({
            chainSimulatorUrl,
            sender: issuer,
            receiver: DCDT_ADDRESS,
            dataField: dataFields.join('@'),
            value: '0',
            gasLimit: 60000000,
        }));
        console.log(`Set special roles for collection ${tokenIdentifier}. tx hash: ${txHash}`);
        await new Promise(resolve => setTimeout(resolve, 5000));
        for (let j = 1; j <= numNfts; j++) {
            const nftCreateDataFields = [
                'DCDTNFTCreate',
                Buffer.from(tokenIdentifier).toString('hex'),
                type === 'sft' ? '0a' : '01',
                Buffer.from(`Test${type === 'sft' ? 'SFT' : 'NFT'}${j}`).toString('hex'),
                '0064',
                Buffer.from('TestHash').toString('hex'),
                Buffer.from(`tags:test,example;description:Test ${type === 'sft' ? 'SFT' : 'NFT'} ${j}`).toString('hex'),
                Buffer.from('https://example.com/nft.png').toString('hex'),
                Buffer.from('https://example.com/nft.json').toString('hex'),
            ];
            const createTxHash = await sendTransaction(new SendTransactionArgs({
                chainSimulatorUrl,
                sender: issuer,
                receiver: issuer,
                dataField: nftCreateDataFields.join('@'),
                value: '0',
                gasLimit: 100000000,
            }));
            const txResponse = await axios_1.default.get(`${chainSimulatorUrl}/transaction/${createTxHash}?withResults=true`);
            if (((_b = (_a = txResponse === null || txResponse === void 0 ? void 0 : txResponse.data) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.status) === 'fail') {
                console.error(`Failed to create NFT ${j} for collection ${tokenIdentifier}. tx hash: ${createTxHash}`);
                console.error('Error:', (_f = (_e = (_d = (_c = txResponse === null || txResponse === void 0 ? void 0 : txResponse.data) === null || _c === void 0 ? void 0 : _c.data) === null || _d === void 0 ? void 0 : _d.logs) === null || _e === void 0 ? void 0 : _e.events[0]) === null || _f === void 0 ? void 0 : _f.topics[1]);
            }
            else {
                console.log(`Created ${type === 'sft' ? 'SFT' : 'NFT'}${j} for collection ${tokenIdentifier}. tx hash: ${createTxHash}`);
            }
        }
    }
    return nftCollectionIdentifiers.map(x => x.identifier);
}
exports.issueMultipleNftsCollections = issueMultipleNftsCollections;
class IssueNftArgs {
    constructor(options = {}) {
        this.chainSimulatorUrl = '';
        this.issuer = '';
        this.tokenName = '';
        this.tokenTicker = '';
        Object.assign(this, options);
    }
}
exports.IssueNftArgs = IssueNftArgs;
async function issueMultipleMetaDCDTCollections(chainSimulatorUrl, issuer, numberOfCollections, tokensPerCollection) {
    var _a, _b, _c, _d, _e;
    const metaDcdtCollectionIdentifiers = [];
    for (let i = 0; i < numberOfCollections; i++) {
        const tokenName = `MetaDCDTCollection${i}`;
        const tokenTicker = `META${i}`;
        const txHash = await sendTransaction(new SendTransactionArgs({
            chainSimulatorUrl: chainSimulatorUrl,
            sender: issuer,
            receiver: DCDT_ADDRESS,
            value: '50000000000000000',
            gasLimit: 60000000,
            dataField: [
                'registerMetaDCDT',
                Buffer.from(tokenName).toString('hex'),
                Buffer.from(tokenTicker).toString('hex'),
                '12',
                Buffer.from('canFreeze').toString('hex'),
                Buffer.from('true').toString('hex'),
                Buffer.from('canWipe').toString('hex'),
                Buffer.from('true').toString('hex'),
                Buffer.from('canPause').toString('hex'),
                Buffer.from('true').toString('hex'),
                Buffer.from('canTransferNFTCreateRole').toString('hex'),
                Buffer.from('true').toString('hex'),
                Buffer.from('canChangeOwner').toString('hex'),
                Buffer.from('true').toString('hex'),
                Buffer.from('canUpgrade').toString('hex'),
                Buffer.from('true').toString('hex'),
                Buffer.from('canAddSpecialRoles').toString('hex'),
                Buffer.from('true').toString('hex'),
            ].join('@'),
        }));
        const txResponse = await axios_1.default.get(`${chainSimulatorUrl}/transaction/${txHash}?withResults=true`);
        const dcdtIssueLog = (_e = (_d = (_c = (_b = (_a = txResponse === null || txResponse === void 0 ? void 0 : txResponse.data) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.transaction) === null || _c === void 0 ? void 0 : _c.logs) === null || _d === void 0 ? void 0 : _d.events) === null || _e === void 0 ? void 0 : _e.find((event) => event.identifier === 'registerMetaDCDT');
        if (dcdtIssueLog) {
            const tokenIdentifier = Buffer.from(dcdtIssueLog.topics[0], 'base64').toString();
            metaDcdtCollectionIdentifiers.push({ identifier: tokenIdentifier });
            console.log(`Issued MetaDCDT collection ${tokenName}. tx hash: ${txHash}. identifier: ${tokenIdentifier}`);
            const setRolesTxHash = await sendTransaction(new SendTransactionArgs({
                chainSimulatorUrl: chainSimulatorUrl,
                sender: issuer,
                receiver: DCDT_ADDRESS,
                value: '0',
                gasLimit: 60000000,
                dataField: [
                    'setSpecialRole',
                    Buffer.from(tokenIdentifier).toString('hex'),
                    sdk_nestjs_common_1.AddressUtils.bech32Decode(issuer),
                    Buffer.from('DCDTRoleNFTCreate').toString('hex'),
                    Buffer.from('DCDTRoleNFTBurn').toString('hex'),
                    Buffer.from('DCDTRoleNFTAddQuantity').toString('hex'),
                ].join('@'),
            }));
            console.log(`Set special roles for collection ${tokenIdentifier}. tx hash: ${setRolesTxHash}`);
            await new Promise(resolve => setTimeout(resolve, 5000));
            for (let j = 1; j <= tokensPerCollection; j++) {
                const createTxHash = await sendTransaction(new SendTransactionArgs({
                    chainSimulatorUrl,
                    sender: issuer,
                    receiver: issuer,
                    dataField: [
                        'DCDTNFTCreate',
                        Buffer.from(tokenIdentifier).toString('hex'),
                        '0a',
                        Buffer.from(`TestMetaDCDT${j}`).toString('hex'),
                        '0064',
                        Buffer.from('TestHash').toString('hex'),
                        Buffer.from(`tags:test,example;description:Test MetaDCDT ${j}`).toString('hex'),
                        Buffer.from('https://example.com/nft.png').toString('hex'),
                        Buffer.from('https://example.com/nft.json').toString('hex'),
                    ].join('@'),
                    value: '0',
                    gasLimit: 100000000,
                }));
                console.log(`Created MetaDCDT${j} for collection ${tokenIdentifier}. tx hash: ${createTxHash}`);
            }
        }
    }
    return metaDcdtCollectionIdentifiers.map(x => x.identifier);
}
exports.issueMultipleMetaDCDTCollections = issueMultipleMetaDCDTCollections;
async function transferNft(args) {
    const nonceHex = typeof args.nonce === 'number'
        ? args.nonce.toString(16).padStart(2, '0')
        : args.nonce;
    const quantityHex = args.quantity.toString(16).padStart(2, '0');
    const receiverHex = sdk_nestjs_common_1.AddressUtils.bech32Decode(args.receiver);
    const dataField = [
        'DCDTNFTTransfer',
        Buffer.from(args.collectionIdentifier).toString('hex'),
        nonceHex,
        quantityHex,
        receiverHex,
    ].join('@');
    console.log(`NFT Transfer data field: ${dataField}`);
    return await sendTransaction(new SendTransactionArgs({
        chainSimulatorUrl: args.chainSimulatorUrl,
        sender: args.sender,
        receiver: args.sender,
        dataField: dataField,
        value: '0',
        gasLimit: 1000000,
    }));
}
exports.transferNft = transferNft;
class TransferNftArgs {
    constructor(options = {}) {
        this.chainSimulatorUrl = '';
        this.sender = '';
        this.receiver = '';
        this.collectionIdentifier = '';
        this.nonce = '';
        this.quantity = 1;
        Object.assign(this, options);
    }
}
exports.TransferNftArgs = TransferNftArgs;
async function transferNftFromTo(chainSimulatorUrl, senderAddress, receiverAddress, collectionIdentifier, nftNonce, quantity = 1) {
    console.log(`Transferring NFT from ${senderAddress} to ${receiverAddress}`);
    console.log(`Collection: ${collectionIdentifier}, Nonce: ${nftNonce}, Quantity: ${quantity}`);
    const txHash = await transferNft(new TransferNftArgs({
        chainSimulatorUrl,
        sender: senderAddress,
        receiver: receiverAddress,
        collectionIdentifier,
        nonce: nftNonce,
        quantity,
    }));
    console.log(`NFT transfer completed. Transaction hash: ${txHash}`);
    return txHash;
}
exports.transferNftFromTo = transferNftFromTo;
async function transferRewa(chainSimulatorUrl, senderAddress, receiverAddress, amountInRewaNominated) {
    const amountInRewaNominatedStr = amountInRewaNominated.toString();
    const rewaDecimals = '0'.repeat(18);
    console.log(`Transferring ${amountInRewaNominated} REWA from ${senderAddress} to ${receiverAddress}`);
    const txHash = await sendTransaction(new SendTransactionArgs({
        chainSimulatorUrl,
        sender: senderAddress,
        receiver: receiverAddress,
        value: (amountInRewaNominatedStr.concat(rewaDecimals)),
        dataField: '',
    }));
    console.log(`REWA transfer completed. Transaction hash: ${txHash}`);
    await axios_1.default.post(`${chainSimulatorUrl}/simulator/generate-blocks-until-transaction-processed/${txHash}`);
    return txHash;
}
exports.transferRewa = transferRewa;
//# sourceMappingURL=chain.simulator.operations.js.map