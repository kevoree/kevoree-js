## kevoree-comp-wsmsgbroker

Starts a WebSocket server using dictionary attributes `port` & `port`  


### Usage
Add `WSMsgBroker` into a `JavascriptNode`, then set its `port` & `path` (optional) attributes.  
Deploy your model, and that's it! You have a running WebSocket server listening on `0.0.0.0:<PORT>/<PATH>`  

### Protocol
The server expects received messages to be JSON-encoded and to respect this protocol:  
  
  - register: Register a new client  
  ```json
    {
      "action": "register",
      "id": "YOUR_CLIENT_ID"
    }
  ```  
  > The uniqueness of the `IDs` must be handled by the clients otherwise the server will just replace the old client-id.
  
  - send: Send a message to a client (or multiple clients)  
  ```json
    {
      "action": "send",
      "dest": "SOME_CLIENT_ID",
      "message": "some message"
    }
  ```  
  or  
  ```json
    {
      "action": "send",
      "dest": ["CLIENT_ID0", "CLIENT_ID1", "CLIENT_ID2"],
      "message": "some message"
    }
  ```  
  > `msg.dest` can be a `string` or an `array` of strings