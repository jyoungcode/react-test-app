import React, { Component } from 'react';
import { post } from 'axios';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';


const styles = theme => ({
  hidden: {
    display: 'none'
  }
})

class CustomerAdd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null,
      userName: '',
      birthday: '',
      gender: '',
      job: '',
      fileName: '',
      // dialog가 open/close 상태표시
      open: false
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
      fileName: '',
      // submit이후에 추가되고 모달창 close
      open: false
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

  // const 안붙이는 이유 js의 class방식생각
  // https://infoscis.github.io/2018/02/13/ecmascript-6-introducing-javascript-classes/
  handleClickOpen = () => {
    this.setState({
      open: true
    });
  }

  // 화살표 함수를 써야 자동 this binding이 된다
  handleClose = () => {
    this.setState({
      file: null,
      userName: '',
      birthday: '',
      gender: '',
      job: '',
      fileName: '',
      open: false
    });
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Button variant="contained" color="primary" onClick={this.handleClickOpen}>
          고객 추가하기
        </Button>
        {/* Button클릭시 open:true로 바뀌어서 Dialog가 열린다 */}
        <Dialog open={this.state.open} onClose={this.handleClose}>
          <DialogTitle>고객 추가</DialogTitle>
          <DialogContent>
            {/* classes.hidden은 withStyles로 정의한거 */}
            <input className={classes.hidden} accept="image/*" id="raised-button-file" type="file" file={this.state.file} value={this.state.fileName} onChange={this.handleFileChange} /><br />
            
            <label htmlFor="raised-button-file">
              <Button variant="contained" color="primary" component="span" name="file">
                {this.state.fileName === "" ? "프로필 이미지 선택" : this.state.fileName}
              </Button> 
            </label>
            <br />
            <TextField label="이름" type="text" name="userName" value={this.state.userName} onChange={this.handleValueChange} /><br />

            <TextField label="생년월일" type="text" name="birthday" value={this.state.birthday} onChange={this.handleValueChange} /><br />

            <TextField label="성별" type="text" name="gender" value={this.state.gender} onChange={this.handleValueChange} /><br />

            <TextField label="직업" type="text" name="job" value={this.state.job} onChange={this.handleValueChange} /><br />
          </DialogContent>
          <DialogActions>
            <Button variant="contained" color="primary" onClick={this.handleFormSubmit}>추가</Button>
            <Button variant="outlined" color="primary" onClick={this.handleClose}>닫기</Button>
          </DialogActions>
        </Dialog>
      </div>

      /*
      <form onSubmit={this.handleFormSubmit}>
        <h1>고객 추가</h1>
        프로필 이미지: <input type="file" name="file" file={this.state.file} value={this.state.fileName} onChange={this.handleFileChange} /><br />
        
        이름: <input type="text" name="userName" value={this.state.userName} onChange={this.handleValueChange} /><br />

        생년월일: <input type="text" name="birthday" value={this.state.birthday} onChange={this.handleValueChange} /><br />

        성별: <input type="text" name="gender" value={this.state.gender} onChange={this.handleValueChange} /><br />

        직업: <input type="text" name="job" value={this.state.job} onChange={this.handleValueChange} /><br />
        <button type="submit">추가하기</button>
      </form>
      */
    )
  }
}

export default withStyles(styles)(CustomerAdd);