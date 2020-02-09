import React,{ Component } from 'react';
import $ from "jquery";
import './assets/Articles.css';

class Aricles extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: ''
    };
  }

  /*componentDidMount() {
    $.ajax({
      url: '/data/articles.json',
      dataType: 'json',
      success: function(res) {
        this.setState({datajson: res});
      }.bind(this)
    });
  }*/

  render() {
    return (
      <p>
        -
      </p>
    )
  }
}
export default Aricles;
