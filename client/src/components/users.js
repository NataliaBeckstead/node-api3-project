import React, {Component} from 'react';
import axios from "axios";

class Users extends Component {

    constructor(){
        super();
        this.state = {
          users: []
        }
      }
    
      componentDidMount() {
        axios.get('http://localhost:4000/api/user')
        .then(res => {
          console.log(res);
          this.setState({
            users: res.data
          })
          return res.data
        })
      }

    render(){
        return(
            this.state.map(user => {
                return (
                    <div className='card'>
                        {/* <h2>{user.name}</h2> */}
                        <p>lalala</p>
                    </div>
                )
            })

        )
    }
}

export default Users;