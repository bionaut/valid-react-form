#VALID REACT FORM 
    
Easy form validations with customizable components, error handling and payload generator, that can be used for AJAX. 
 
*note: documentation in progress :)*
 
##Installation
 
Valid React Form is available as [npm package](https://www.npmjs.org/package/valid-react-form).

```sh
npm install valid-react-form
```

## Usage

#### 1. Include it in your project


```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import {ValidForm, Field, ValidStyles } from 'react-valid-form';
 
const App = () => (
  <ValidStyles>
    <ValidForm>
        <Field label='Some label' 
               placeholder='placeholder text'  
               name='field1' 
               friendlyName='Sample field' 
               required={true}
               valdator='isLength:3' />
    </ValidForm>
  </ValidStyles>
);
 
ReactDOM.render(
  <App />,
  document.getElementById('app')
);
```

Note that this library comes with **styling** component [ValidStyles](https://github.com/bionaut/valid-react-form/blob/master/src/components/ValidStyles/ValidStyles.js).
*It is recommended (especially until version 1.x.x) to use this component. You can easily override colors and constants. However all components have class names defined, so you can style them with your own CSS styles - in that case don't use ValidStyles wrapper*

#####ValidStyles example

```jsx


// you can override all or just few colors
const customColors = {
  primaryColor: '#38C2FF',
  secondaryColor: '#c5e767',
  lightColor: '#dddddd',
  darkColor: '#464646',
  tooltipColor: '#ffdf81',
  errorColor: '#E74C3C'
};

 
// same here, you can replace all or just one (most often it is 'defaultItemSize')
const customConstants = {
  defaultItemSize: 30,
  gap: '10px',
  smallGap: '5px',
  fontSize: '0.9em',
  defaultTransition: 'all 0.2s ease',
  defaultRadius: '5px'
};

 
<ValidStyles colors = {customColors} 
             constants={customConstants}>
  
  {/* form component will go here */} 
  
</ValidStyles>
```

#### 2. Add ValidForm component 


```jsx

function onSubmitCallback(payload){
    console.log(payload);
}

<ValidForm readOnly={someSwitch} 
           errorPanel={true} 
           onSubmit={onSubmitCallback} 
           debug={true} 
           extended={{ extended: 'extended_data' }}
           errors={..}
           autoComplete='off' >
 
    {/* children components like Field etc... will go here */}
    
</ValidForm>
```

- **readOnly**: if **true** form and all children components will switch to read only mode
- **errorPanel**: this is **false** by default and all error messages are below failed field. If this is **true** error messages will move into one common panel above entire form
- **debug**: if **true** developer debug window will be shown under form displaying your payload and form state
- **onSubmit**: function name that should be called after submit (payload as first parameter)
- **extended**: you can feed the form with some additional data (object)
- **errors**: to display error for any field just provide an object with name of the field as **key** and error message as **value** ( field1: 'Delayed error returned...' )


#### 3. Add children components

###Field component

```jsx 

  const errorMessages = {
    required: 'This field is required, please add some value',
    isLength: 'This field should be at least 2 chars long',
    isAlpha: 'No Numbers please',
    contains: 'This text has to contain word: "hello"'
  };
  
  const myCallback = (newValue) => {
    // some callback
  };
    
  <Field name='field2'
         friendlyName='Required field2'
         label='Field2 label'
         placeholder='placeholder text'
         errorMessages={errorMessages}
         helper='This is helper tooltip text example' 
         validator='isLength:2|isAlpha|contains:hello'
         readOnly={false}
         disabled={false}
         icons={true}
         onChange={myCallback}
         debounce={200}
         required={true}/>

```

- **name**: name is **required** property (should be unique name - it is used in payload)
- **friendlyName**: is used only in common form error panel (only fill it when you used errorPanel on form element)
- **label**: will add label above field
- **readOnly**: if **true** component will switch to read only mode
- **errorMessages**: this can be just a **string** or an object with names of validators as keys and error messages as values 
- **required**: if **true** field will be invalid while empty    
- **validator**: validator formulas goes here (see validators section for details)
- **icons**: if **true** validations icons will appear
- **helper**: small question mark sign with tooltip will appear
- **onChange**: input change callback function goes here 
- **debounce**: onChange callback delay (in milliseconds)
 
###Select component
TODO DOCS - meanwhile check example.js

###Toggle component
TODO DOCS - meanwhile check example.js

###Button component
TODO DOCS - meanwhile check example.js

###Valid (universal) component
TODO DOCS - meanwhile check example.js

