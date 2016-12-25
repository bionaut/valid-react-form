import React from 'react';
import { render } from 'react-dom';
import {
  ValidForm,
  Field,
  ValidStyles,
  Button,
  Valid,
  Toggle,
  Select,
  Helper
} from '../src/index';

const dummyHandler = function (payload) {
  console.log(payload);
};

const errorMessages = {
  isAlpha: 'Only alpha',
  contains: 'This has to contain test',
  required: 'This field is required'
};

const wrapperStyle = {
  position: 'relative',
  width: '100%',
  padding: 0,
  margin: 0
};

const selectData = [
  {value: 1, label: 'Option 1'},
  {value: 2, label: 'Option 2'},
  {value: 3, label: 'Option 3'},
  {value: 4, label: 'Option 4'},
  {value: 5, label: 'Option 5'},
  {value: 6, label: 'Option 6'},
  {value: 7, label: 'Option 7'},
  {value: 8, label: 'Option 8'},
  {value: 9, label: 'Option 9'},
  {value: 10, label: 'Option 10'},
  {value: 11, label: 'Option 11'},
  {value: 12, label: 'Option 12'},
];

let someSwitch = false;

const toggleOnChange = () => {
  someSwitch = !someSwitch;
  renderExample();
};

const Example = () => (
  <div style={wrapperStyle}>

    <ValidStyles>
      <Toggle onChange={toggleOnChange} name='toggle' >Toggle Read-Only mode</Toggle>
    </ValidStyles>

    <ValidStyles>
      <ValidForm readOnly={someSwitch} errorPanel={true} extended={{ extended: 'extended_data' }} debug={true} onSubmit={dummyHandler} autoComplete='off'>

        <h2>Field</h2>
        <Field icons={true} label='Some label' placeholder='must contain test' errorMessages={errorMessages} name='field1' friendlyName='Validated field' validator='isAlpha|contains:test' required={true}/>
        <Field disabled={true} value='disabled value' label='Some label' placeholder='is disabled' errorMessages={errorMessages} name='field2' friendlyName='Disabled field' required={true}/>
        <Field helper='This is helper tooltip text example' label='Some label' placeholder='type something' errorMessages={errorMessages} name='field3' friendlyName='Required field' required={true}/>

        <h2>Toggle</h2>
        <Toggle name='toggle' friendlyName='Check' required={true}>Check this!</Toggle>
        <Toggle disabled={true} name='toggle2' friendlyName='Check2' required={true} >Disabled</Toggle>

        <h2>Select</h2>
        <Select scrollTrigger={15} label='Normal Select' placeholder='Select something' data={selectData} name='select1'/>
        <Select value={2} label='Preselected' data={selectData} name='select2' friendlyName='Select'/>
        <Select value={1} label='Disabled' disabled={true} placeholder='Select something' data={selectData} name='select3' />
        <Select icons={true} label='Required' required={true} placeholder='This select is required' data={selectData} name='select4'/>
        <Select helper='some help' clearButton={true} label='Some label' required={true} errorMessages='Choose something' placeholder='This select is with error' data={selectData} name='select5' friendlyName='Select'/>

        <br/>
        <label htmlFor='uni'>Universal wrapper</label>
        <Valid errorMessages='This is invalid!' name='uni' friendlyName='Universal' required={true} validator='isLength:3'>
          <input name='uni' id='universal' type='text'/>
        </Valid>
        <br/>

        <br/>
        <Button fullWidth={false} type='submit'>Submit</Button>

      </ValidForm>
    </ValidStyles>

  </div>
);

const App = () => (
  <Example />
);

function renderExample() {
  render(<App/>, document.querySelector('#root'));
}

renderExample();