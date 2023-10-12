import React, { Component } from "react";
import "./App.css";

import sha256 from 'crypto-js/sha256';
import hmacSHA512 from 'crypto-js/hmac-sha512';
import Base64 from 'crypto-js/enc-base64';
import CryptoJS from "crypto-js";


class App extends Component {
  state = {
    opcion: 0, // 1 para cifrar, 2 para descifrar
    mensaje: "",
    resultado: "",
  };

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleClearText = () => {
    this.setState({ mensaje: "", resultado: "" });
  };

  handleCifradoCesar = () => {
    const { opcion, mensaje } = this.state;
    const abecedario = "abcdefghijklmnopqrstuvwxyz";
    const desplamiento = 5;
    let text = "";

    if (opcion === "1") {
      // Cifrar
      text = CryptoJS.AES.encrypt(JSON.stringify(mensaje), 'secret key 123').toString();
    } else if (opcion === "2") {
      // Descifrar

      const bytes  = CryptoJS.AES.decrypt(mensaje, 'secret key 123');
      const decryptedString = bytes.toString(CryptoJS.enc.Utf8);
      console.log({ decryptedString});

      text = decryptedString;

    } else {
      this.setState({
        resultado:
          "Opción no válida. Debe seleccionar una opcion para cifrar o descifrar.",
      });
      return;
    }

    this.setState({ resultado: text });
  };

  render() {


    const { opcion, mensaje, resultado } = this.state;

    return (
      <div className=" ">
        <main  className="container">

       
        <h1 className="">Cifrado César</h1>
        
        <div className="shadow px-2 bg-gray-200">

          <label>
            Opción:
            <select
              name="opcion"
              value={opcion}
              onChange={this.handleInputChange}
            >
              <option value="">Seleccione una opcion</option>
              <option value="1">Cifrar</option>
              <option value="2">Descifrar</option>
            </select>
          </label>

          <br />
          <label>
            Mensaje:
            <textarea
              type="text"
              name="mensaje" // Add the name attribute
              value={mensaje}
              onChange={this.handleInputChange}
            />
          </label>
          <br />
          <button onClick={this.handleCifradoCesar} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Realizar</button>
          <button onClick={this.handleClearText} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Limpiar Texto</button>

          <br />
          <div>Resultado: {resultado}</div>
        </div>
        </main>
        </div>

    );
  }
}

export default App;
