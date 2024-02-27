import { useState, useEffect } from "react";

function App() {
  const postMessageToListeners = ({ event, data }) => {
    window.parent && window.parent.postMessage({ type: event, data }, "*");
  };
  const handleCloseClick = () => postMessageToListeners({ event: "close" });
  const handleSuccessClick = () => {
    const transactionData = {
      type: "transaction",
      transaction: {
        id: "transaction-identifier",
        remark: "medicine",
        amount: 50000,
        currency: "NGN",
        charge: 0,
        type: "peer",
        refund: false,
        channel: "send",
        status: "success",
        user: {
          name: "Tim Cook",
          identifier: "tim",
          identifier_type: "username",
          email: "tim@apple.com",
          reference: "one-more-thing",
          created_at: "2020-05-06T12:00:00.000Z",
          updated_at: "2020-05-06T12:00:00.000Z",
        },
        checkout: null,
        mode: "credit",
        reference: "transaction-reference",
        peer: {
          user: {
            name: "Kamsi Oleka",
            identifier: "ezemmuo",
            identifier_type: "username",
          },
          business: {
            name: "Apple",
            logo: null,
            logo_colour: "#ffffff",
          },
        },
        meta: {
          city: "Cupertino",
          state: "California",
        },
        created_at: "2021-04-12T19:52:22.000000Z",
        updated_at: "2021-04-12T19:52:22.000000Z",
      },
    };
    postMessageToListeners({ event: "success", data: transactionData });
  };

  const [config, setConfig] = useState({});

  // listening for messages starts here
  const handleMessage = (event) => {
    if (event.data.type === "sdkData") {
      console.log("SDK D", event?.data);
      setConfig(event.data.config?.config);
    }
  };

  window.addEventListener("message", handleMessage);
  useEffect(() => {
    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, []);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        margin: "0px auto",
        flexDirection: "column",
      }}
    >
      <div style={{ background: "#fff", padding: "40px", width: "40vw" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <h1>Connect Wallet</h1>
          <h3>Nyerishi Pay</h3>
        </div>
        {config && <h3>Name: {config.name}</h3>}
        <h3>Name: Chibueze Sam-Obisike</h3>
        <h3>Amount: {config.amount}</h3>
        <h3>Email: Nyerishi@gmail.com</h3>
        <hr />
        <p style={{ lineHeight: "0" }}>Amount</p>
        <h5 style={{ fontSize: "30px", lineHeight: 0 }}>N100,000</h5>
        <input
          placeholder='Enter Card number'
          style={{ width: "96%", padding: "10px", margin: "0 auto" }}
        />
        <div style={{ display: "block", marginTop: "20px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <button
              style={{
                background: "#62318B",
                outline: "none",
                border: "none",
                padding: "10px",
                color: "#fff",
                cursor: "pointer",
              }}
              onClick={handleSuccessClick}
            >
              Pay with card
            </button>
            <button
              style={{
                border: ".5px solid #62318B",
                outline: "none",
                padding: "10px",
                background: "#fff",
                color: "#62318B",
                cursor: "pointer",
              }}
              onClick={handleCloseClick}
            >
              Close
            </button>
          </div>
        </div>
      </div>
      <div style={{ marginTop: "10px", fontWeight: "bold", zIndex: 99 }}>
        Secured by Nyerishi Pay
      </div>
    </div>
  );
}

export default App;
