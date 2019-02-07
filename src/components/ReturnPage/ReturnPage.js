import React, {Component} from 'react';
import axios from 'axios';

class ReturnPage extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
          return: [],
        }
      }

    componentDidMount(){
        this.getAllUsers();
    }

    getAllUsers(){
        axios({
            method: 'GET',
            url: '/api/user/return'
        }).then(response => {
            console.log('hey',response.data)
            // this.props.dispatch({type: 'FETCH_USER'})
            this.setState({
                return: response.data,
            })
        });
    }

  render() {
    return (
      <div>
        {JSON.stringify(this.state)}
        <ul>
            {this.state.return.map(user => {
                return <li key={user.id}>{user.username}</li>
            })}
        </ul>
      </div>
    );
  }
}



export default ReturnPage;