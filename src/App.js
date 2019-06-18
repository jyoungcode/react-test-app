import React, {Component} from 'react';
import Customer from './components/Customer';
import './App.css';

/* 만든 순서
1. nodejs 설치
2. create-react-app .
3. github repo 만들기
4. vscode에서 왼쪽패널 3번째 source code 보면 +버튼 stage change로 올리고 commit
5. git remote add origin 주소
6. git push --set-upstram origin master
*/

const customers = [
  {
    id: 1,
    image: 'https://placeimg.com/64/64/any',
    name: 'John',
    birthday: '890424',
    gender: 'man',
    job: '학생'
  },
  {
    id: 2,
    image: 'https://placeimg.com/64/64/any',
    name: 'Nana',
    birthday: '890424',
    gender: 'girl',
    job: '학생'
  },
  {
    id: 3,
    image: 'https://placeimg.com/64/64/any',
    name: 'Sara',
    birthday: '890424',
    gender: 'girl',
    job: '학생'
  },
]

class App extends Component {
  render() {
    return (   
      <div className="App">
        {/* map으로 대체하자 */}
        {/* <Customer
          id={customer[0].id}
          image={customer.image} 
          name={customer.name}
          birthday={customer.birthday}
          gender={customer.gender}
          job={customer.job}
        /> */}

        {
          customers.map(c => {
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
            );
          })
        }
      </div>
    );
  }
}

export default App;
