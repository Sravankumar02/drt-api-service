import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit } from "@nestjs/websockets";
import { Socket, Server } from "socket.io";
export declare class ConnectionHandler implements OnGatewayDisconnect, OnGatewayConnection, OnGatewayInit {
    server: Server;
    afterInit(__server: Server): void;
    handleDisconnect(_client: Socket): void;
    handleConnection(client: Socket, ..._args: any[]): void;
    hasSubscriptionsWithPrefixes(prefixes: string[]): boolean;
}
