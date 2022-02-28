import React, { useEffect, useState } from "react";
import Card from "react-credit-cards";
import {
  formatCreditCardNumber,
  formatCVC,
  formatExpirationDate,
  formatFormData
} from "./utils";
import axios from "axios";
import "react-credit-cards/es/styles-compiled.css"



export default class StudentPayment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      student: {},
      number: "",
      name: "",
      expiry: "",
      cvc: "",
      issuer: "",
      focused: "",
      formData: null,
      sum: 0,
      random: 0,
      BalanceOfPayment: 0
    };

  }

  handleCallback = ({ issuer }, isValid) => {
    if (isValid) {
      this.setState({ issuer });
    }
  };
  handleStudent = ({ student }) => {
    this.setState({ student });
  };

  handleInputFocus = ({ target }) => {
    this.setState({
      focused: target.name
    });
  };


  handleSubmit = event => {

    event.preventDefault();
    this.setSum(this.Payment);
  
    // };

    // alert("התשלום התבצע בהצלחה")
  }

  Payment = async () => {
    const pay = {
      sum: this.state.sum,
      reference: 555555,
      status: 1
    };
    const id = this.props.match.params.id
    const arrstudentDetails = await axios.post(`http://localhost:8000/api/students/payments/${id}`, { pay })
    if (arrstudentDetails) {
      console.log(Number(arrstudentDetails.data.BalanceOfPayment));
      return arrstudentDetails.data.BalanceOfPayment
    }
  }
  getStudent = async () => {
    const id = this.props.match.params.id
    const arrstudentDetails = await axios.get(`http://localhost:8000/api/students/${id}`)
    if (arrstudentDetails)
      return arrstudentDetails.data.BalanceOfPayment
  }
  setSum = async (nameOfFunc) => {
    let balanceOfPayment = await nameOfFunc();
    if (balanceOfPayment)
      this.setState({ sum: Number(balanceOfPayment) })
  }
  componentDidMount() {
    this.setSum(this.getStudent)
  }
  checkSum = () => {
    return this.state.sum == 0 || this.state.sum < 0;
  }
  handleInputChange = ({ target }) => {
    if (target.name === "number") {
      target.value = formatCreditCardNumber(target.value);
    } else if (target.name === "expiry") {
      target.value = formatExpirationDate(target.value);
    } else if (target.name === "cvc") {
      target.value = formatCVC(target.value);
    }

    this.setState({ [target.name]: target.value });

  };
  render() {
    const { name, sum, number, expiry, cvc, focused, issuer, formData, student } = this.state;
    const rand = 1 + (Math.random() * (9 - 1));
    return (
      <div id="PaymentForm" key="Payment">
        <div className="App-payment">
          <h1>  student payment:הסכום לתשלום הוא</h1>
          {/* onSubmit={this.handleSubmit} */}
          <form ref={c => (this.form = c)} onSubmit={this.handleSubmit} >
            <Card
              number={number}
              name={name}
              expiry={expiry}
              cvc={cvc}
              focused={focused}
              callback={this.handleCallback}
              sum={sum}
            />
            <div className="row">
              <div className="form-group col-12">
                <input
                  type="tel"
                  name="number"
                  className="form-control"
                  placeholder="הכנס מספר אשראי"
                  pattern="[\d| ]{16,22}"
                  required
                //   disabled={this.checkSum()}
                  onChange={this.handleInputChange}
                  onFocus={this.handleInputFocus}
                />
                <small>Ex.: 36., 37., 41., 51., 60...</small>
              </div>
              <div className="form-group col-12">
                <input
                  disabled={true}
                  type="number"
                  name="sum"
                  className="form-control"
                  placeholder="הסכום לתשלום"
                  value={sum}
                  onChange={this.handleInputChange}
                  onFocus={this.handleInputFocus}
                />
              </div>
              <div className="form-group col-12">
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  placeholder="שם בעל האשראי"
                  required
                //   disabled={this.checkSum()}
                  onChange={this.handleInputChange}
                  onFocus={this.handleInputFocus}
                />
              </div>
              <div className="col-6 form-group">
                <input
                  type="tel"
                  name="expiry"
                  className="form-control"
                  placeholder="תאריך תפוגה"
                  pattern="\d\d/\d\d"
                  required
                  disabled={this.checkSum()}
                  onChange={this.handleInputChange}
                  onFocus={this.handleInputFocus}
                />
              </div>
              <div className="col-6 form-group">
                <input
                  type="tel"
                  name="cvc"
                  className="form-control"
                  placeholder="CVC"
                  pattern="\d{3,4}"
                  required
                  disabled={this.checkSum()}
                  onChange={this.handleInputChange}
                  onFocus={this.handleInputFocus}
                />
              </div>
              <input type="hidden" name="issuer" value={issuer} />
              <div className="form-actions col-12">
                <button type="submit" className="btn btn-primary btn-block" disabled={this.checkSum()} >אשור</button>
              </div>
            </div>
          </form>
          {formData && (
            <div className="App-highlight">
              {formatFormData(formData).map((d, i) => (
                <div key={i}>{d}</div>
              ))}
            </div>
          )}
          <hr style={{ margin: "60px 0 30px" }} />
        </div>


      </div>
    );
  }
}