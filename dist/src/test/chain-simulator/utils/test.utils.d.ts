export declare class ChainSimulatorUtils {
    static waitForEpoch(targetEpoch?: number, maxRetries?: number): Promise<boolean>;
    private static checkSimulatorHealth;
    static deployPingPongSc(deployer: string): Promise<string>;
    static pingContract(sender: string, scAddress: string): Promise<void>;
    static pongContract(sender: string, scAddress: string): Promise<void>;
}
