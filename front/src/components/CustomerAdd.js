import React, { Component } from 'react';
import { post } from 'axios';

class CustomerAdd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null,
      userName: '',
      birthday: '',
      gender: '',
      job: '',
      fileName: ''
    }
  }

  handleFormSubmit = (e) => {
    e.preventDefault();
    // form submit 될때 이 함수 실행
    this.addCustomer()
      .then((response) => {
        console.log(response.data);
        // 꼭 데이터를 추가한 다음에 reload되도록
        this.props.stateRefresh();
      })

    this.setState({
      file: null,
      userName: '',
      birthday: '',
      gender: '',
      job: '',
      fileName: ''
    })

    // 주의!! 실제 서비스는 데이터를 전체 불러오는게 아니라! 10개만 불러오고 스크롤시에 더 불러오는 방식!(리소스낭비때문에)
  }

  // file 값 변경시
  handleFileChange = (e) => {
    this.setState({
      file: e.target.files[0],
      fileName: e.target.value
    })
  }

  // text 변경 시
  handleValueChange = (e) => {
    let nextState = {};
    nextState[e.target.name] = e.target.value;
    this.setState(nextState);
  }

  // file 포함 되어있을때 config 설정꼭해야함
  addCustomer = () => {
    const url = '/api/customers';
    const formData = new FormData();
    formData.append('image', this.state.file);
    formData.append('name', this.state.userName);
    formData.append('birthday', this.state.birthday);
    formData.append('gender', this.state.gender);
    formData.append('job', this.state.job);
    const config = {
      headers: {
        'content-type': 'multipart/form-data'
      }
    }
    // axios의 post메서드
    return post(url, formData, config);
  }

  render() {
    return (
      <form onSubmit={this.handleFormSubmit}>
        <h1>고객 추가</h1>
        프로필 이미지: <input type="file" name="file" file={this.state.file} value={this.state.fileName} onChange={this.handleFileChange} /><br />
        
        이름: <input type="text" name="userName" value={this.state.userName} onChange={this.handleValueChange} /><br />

        생년월일: <input type="text" name="birthday" value={this.state.birthday} onChange={this.handleValueChange} /><br />

        성별: <input type="text" name="gender" value={this.state.gender} onChange={this.handleValueChange} /><br />

        직업: <input type="text" name="job" value={this.state.job} onChange={this.handleValueChange} /><br />
        <button type="submit">추가하기</button>
      </form>
    )
  }
}

export default CustomerAdd;