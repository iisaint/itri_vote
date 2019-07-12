import React, { Component } from "react";
import VoteContract from "./contracts/Vote.json";
import getWeb3 from "./utils/getWeb3";
import { Button, Table } from 'rimble-ui';

import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);

    this.handleVote = this.handleVote.bind(this);

    this.state = {
      storageValue: 0, 
      web3: null, 
      accounts: null, 
      contract: null, 
      fee: null, 
      list: []
    };
  }

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = VoteContract.networks[networkId];
      const instance = new web3.eth.Contract(
        VoteContract.abi,
        deployedNetwork && deployedNetwork.address,
      );

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, accounts, contract: instance }, this.runExample);
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  runExample = async () => {
    const { accounts, contract } = this.state;

    // Get owner
    const fee = await contract.methods.fee().call();

    // Get list
    const list = await contract.methods.getList().call();
    console.log(list);


    // Stores a given value, 5 by default.
    // await contract.methods.set(5).send({ from: accounts[0] });

    // Get the value from the contract to prove it worked.
    // const response = await contract.methods.get().call();

    // Update state with the result.
    this.setState({ fee: fee, list: list });
  };

  handleVote = async (name) => {
    const { accounts, contract, fee } = this.state;
    console.log(accounts);
    console.log(fee)
    // vote
    await contract.methods.vote(name).send({from: accounts[0], value: fee});
    // Update list
    const list = await contract.methods.getList().call();
    this.setState({ list });
  }

  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div className="App">
        <h1>Vote Competition</h1>
        <div>The fee is: {this.state.fee} wei</div>
        <br></br>
        <div>
        <Table>
          <thead>
            <tr>
              <th>Competitor</th>
              <th>Counter</th>
              <th>Vote</th>
            </tr>
          </thead>
          <tbody>
            {this.state.list.map(e =>  (
                <tr key={e.name}>
                <td>{e.name}</td>
                <td>{e.counter}</td>
                <td><Button size="medium" onClick={this.handleVote.bind(this, e.name)}>投票</Button></td>
                </tr>
              )
            )}
          </tbody>
        </Table>
        </div>
        <div>

        </div>
      </div>
    );
  }
}

export default App;
