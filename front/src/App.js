import React, {Component} from 'react';
import Customer from './components/Customer';
import CustomerAdd from './components/CustomerAdd';
import './App.css';
// Paper = Container 역할 
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import CircularProgress from '@material-ui/core/CircularProgress';
// css 불러오기
// makeStyles : react-hooks에서 사용가능
// import { makeStyles } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
// import { fade } from '@material-ui/core/styles/colorManipulator';
import { fade } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';

const styles = theme => ({
  root: {
    width: '100%',
    minWidth: 1080,
    // overflowX: "auto",
    flexGrow: 1,
  },
  menu: {
    marginTop: 15,
    marginBottom: 15,
    display: 'flex',
    justifyContent: 'center'
  },
  paper: {
    marginLeft: 18,
    marginRight: 18
  },
  // table: {
  //   minWidth: 1080
  // },
  progress: {
    margin: theme.spacing(2)
  },
  tableHead: {
    fontSize: "1.0rem"
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing(7),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 120,
      '&:focus': {
        width: 200,
      },
    },
  },
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

/* React Component Life Cycle
  1. constructor()
  2. componentWillMount()
  3. render()
  4. componentDidMount() 
*/

/* props or state가 변경될때는
  shouldComponentUpdate()를 실행후 render()를 다시 실행
*/

/*
  서버와 통신하기 위해 axios 설치 (client)
*/

/*
  index.css에서 notosanskr 적용
*/

class App extends Component {
  // state 초기화를 위해, upload 이후
  constructor(props) {
    super(props);
    this.state = {
      customers: "",
      completed: 0,
      searchKeyword: ""
    }
  }

  // 아래 tag에 props 넣어주기
  stateRefresh = () => {
    this.setState({
      customers: "",
      completed: 0,
      searchKeyword: ""
    });
    this.callApi()
      .then(res => this.setState({ customers: res }))
      .catch(err => console.log('err: ', err));
  }

  componentDidMount() {
    this.timer = setInterval(this.progress, 20);

    // callApi가 body로 json을 받은 것이 promise기 때문에 then을 사용
    // progress를 테스트 하기 위해서 코드 잠깐 주석처리
    this.callApi()
      .then(res => this.setState({customers: res}))
      .catch(err => console.log('err: ', err));
  }

  callApi = async () => {
    const response = await fetch('/api/customers');
    const body = await response.json();
    return body;
  }

  // Material-ui를 docs를 잘 참고하자
  // progress의 variant: determinate일때 사용
  progress = () => {
    const { completed } = this.state;
    this.setState({ completed: completed >= 100 ? 0 : completed +1 });
  }

  // 검색창 변화
  handleValueChange = (e) => {
    let nextState = {};
    nextState[e.target.name] = e.target.value;
    this.setState(nextState);
  }

  render() {
    const filteredComponents = (data) => {
      data = data.filter((c) => {
        // 검색하는 데이터가 존재할때 즉 -1보다 큼
        // name에 관해서만 검색이다.
        return c.name.indexOf(this.state.searchKeyword) > -1;
      });
      return data.map((c) => {
        return <Customer
                  key={c.id}
                  id={c.id}
                  image={c.image}
                  name={c.name}
                  birthday={c.birthday}
                  gender={c.gender}
                  job={c.job}
                  stateRefresh={this.stateRefresh}
                />
      });
    }

    const {classes} = this.props;
    // console.log('classes: ', classes);
    const cellList = ["번호", "이미지", "이름", "생년월일", "성별", "직업", "설정"];

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="Open drawer"
            >
              <MenuIcon />
            </IconButton>
            <Typography className={classes.title} variant="h6" noWrap>
              고객 관리 시스템
          </Typography>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="검색..."
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ 'aria-label': 'Search' }}
                // 
                name="searchKeyword"
                value={this.state.searchKeyword}
                onChange={this.handleValueChange}
              />
            </div>
          </Toolbar>
        </AppBar>
        <div className={classes.menu}>
          <CustomerAdd stateRefresh={this.stateRefresh} />
        </div>
        <Paper className={classes.paper}>
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
                {cellList.map(cell => {
                  return <TableCell key={cell} className={classes.tableHead}>{cell}</TableCell>
                })}
              </TableRow>
            </TableHead>
            <TableBody>
              {/* this.state is not function 오류에서 초기에 위에서 customers:""이면서 비동기데이터를 불러오기때문에 오류가 생김. 이것을 삼항연산자로 해결 */}
              {this.state.customers ?
                // this.state.customers.map(c => {
                //   return (
                //     <Customer
                //       key={c.id}
                //       id={c.id}
                //       image={c.image}
                //       name={c.name}
                //       birthday={c.birthday}
                //       gender={c.gender}
                //       job={c.job}
                //       stateRefresh={this.stateRefresh}
                //     />
                //   )
                // }) : 
                filteredComponents(this.state.customers):
                <TableRow>
                  <TableCell colSpan="6" align="center">
                    <CircularProgress 
                      className={classes.progress}
                      color="secondary"
                      // variant="determinate" 
                      // value={this.state.completed}
                    />
                  </TableCell>
                </TableRow>
              }
            </TableBody>
          </Table>
        </Paper>
        
      </div>
    );
  }
}

export default withStyles(styles)(App);
