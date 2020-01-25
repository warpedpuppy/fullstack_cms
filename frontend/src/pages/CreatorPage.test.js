import React from 'react';
import ReactDOM from 'react-dom';
import CreatorPage from './CreatorPage';
import { shallow } from 'enzyme';
describe('smoke tests', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<CreatorPage history={[]} match={ {params: {name: 'x', index: 0}}}/>, div);
    ReactDOM.unmountComponentAtNode(div);
  });
})
// describe( 'click li', () => {
//     it(`responds with 'please choose an image'`, () => {
//       const wrapper = shallow(<CreatorPage history={[]} match={ {params: {name: 'x', index: 0}}}/>)
//       wrapper.find('li').simulate('click');

//       //expect(wrapper.find('div#result').text()).toEqual('please choose an image')
//     })
//   })