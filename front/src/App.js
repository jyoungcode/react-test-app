import React, {Component} from 'react';
import Customer from './components/Customer';
import './App.css';
// Paper = Container 역할 
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
// css 불러오기
import {withStyles} from '@material-ui/core/styles';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
    overflowX: "auto"
  },
  table: {
    minWidth: 1080
  }
})

/* 만든 순서
1. nodejs 설치
2. create-react-app .
3. github repo 만들기
4. vscode에서 왼쪽패널 3번째 source code 보면 +버튼 stage change로 올리고 commit
5. git remote add origin 주소
6. git push --set-upstram origin master
*/

/* vscode -github 사용법
  1. 왼쪽 3번째 탭
  2. +버튼으로 올리고 commit 메시지를 적는다.
  3. 체크 아이콘 commit하고 
  4. 점점점버튼에서 push를 진행
*/

// 사이트에서 example 코드 참고하자
// https://material-ui.com/getting-started/installation/

/*
  express로 backend 폴더 설정 후
  front에서 backend를 받기 위해 비동기 통신, proxy설정(package.json) 해야함
*/

// *Dummydata는 server.js로 옮김
// const customers = []

class App extends Component {
  state = {
    customers: ""
  }

  componentDidMount() {
    // callApi가 body로 json을 받은 것이 promise기 때문에 then을 사용
    this.callApi()
      .then(res => this.setState({customers: res}))
      .catch(err => console.log('err: ', err));
  }

  callApi = async () => {
    const response = await fetch('/api/customers');
    const body = await response.json();
    return body;
  }

  render() {
    const {classes} = this.props;
    // console.log('classes: ', classes);
    return (   
      <Paper className={classes.root}>
        {/* map으로 대체하자 */}
        {/* <Customer
          id={customer[0].id}
          image={customer.image} 
          name={customer.name}
          birthday={customer.birthday}
          gender={customer.gender}
          job={customer.job}
        /> */}
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>번호</TableCell>
              <TableCell>이미지</TableCell>
              <TableCell>이름</TableCell>
              <TableCell>생년월일</TableCell>
              <TableCell>성별</TableCell>
              <TableCell>직업</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/* this.state is not function 오류에서 초기에 위에서 customers:""이면서 비동기데이터를 불러오기때문에 오류가 생김. 이것을 삼항연산자로 해결 */}
            {this.state.customers ?
              this.state.customers.map(c => {
                return (
                  <Customer
                    key={c.id}
                    id={c.id}
                    image={c.image}
                    name={c.name}
                    birthday={c.birthday}
                    gender={c.gender}
                    job={c.job}
                  />
                )
              }) : ""
            }
          </TableBody>
        </Table>
      </Paper>
    );
  }
}

export default withStyles(styles)(App);
