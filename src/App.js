import React, { Component } from 'react';
import './App.css';
import ReactTable from "react-table";
import 'react-table/react-table.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {keyword: '', data: [] };
  }

  // REST API call from here
  // concat the url and keyword state 
  // save the json response to "data"
  fetchData = () => {
    const url = `https://api.github.com/search/repositories?q=${this.state.keyword}`;
    fetch(url)
    .then(response => response.json())
    .then(responseData => {
      this.setState({data : responseData.items });
    });
  }

  handleChange = (e) => {
    this.setState({keyword: e.target.value});
  }

  btnClick = (value) => {
    //alert(value);
    window.location = (value);
  }
  
  render() {
    const columns = [{
      Header: 'Name',        // column header
      accessor: 'full_name'  // value accessor
    }, {
      Header: 'URL',
      accessor: 'html_url',
    }, {
      Header: 'Owner',
      accessor: 'owner.login',
    }, {
      Header: 'Repository Link',
      accessor: 'html_url',      
      id: 'button',
      sortable: false,
      filterable: false,
      width: 200,      
      Cell: ({value}) => (<button type="button" className="btn btn-default btn-link" onClick={() => {this.btnClick(value)}}>Go There</button>)
    }]

    return (
      <div className="App">
        <h2>Search GitHub</h2>
        <input type="text" onChange={this.handleChange} />
        <button onClick={this.fetchData} value={this.state.keyword}>Fetch</button>
        <p>Filter the list further by inserting words above the lists.</p>
        <ReactTable
          data={this.state.data}
          columns={columns}
          filterable={true}
          defaultPageSize={10}
        />
      </div>
    );
  }
}

export default App;
