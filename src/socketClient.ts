export class socketClient{
    private connection: WebSocket;
    private callback: CallableFunction;

    constructor(){
    }

    private onMessage(message: any):void{
        let data = message.data;
        let parts = data.split(";");
        let x = parts[0];
        let y = parts[1];

        this.callback(x,y);
    }

    public run(){
        this.connection = new WebSocket('ws://127.0.0.1:1234');
        this.connection.onmessage = this.onMessage.bind(this);
    }

    public onNewImpact(callback: CallableFunction):void{
        this.callback = callback;        
    }
}