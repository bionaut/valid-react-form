import React from 'react';
import { ValidForm, ValidStyles } from '../../src/index';
import { action } from '@kadira/storybook';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/styles';

const formStyles = {
  position:'relative',
  backgroundColor: '#f5f5f5',
  paddingLeft: 10,
  paddingTop: 10,
  paddingRight: 10,
  paddingBottom: 10,
  borderRadius: 5
};

const wrapperStyles = {
  position:'relative',
  top: '50%',
  width: '90%',
  padding: '20px',
  marginLeft: 'auto',
  marginRight: 'auto'
};

export default function (content, html, js) {
  return (
    <div style={wrapperStyles}>
      <div style={formStyles}>
        <ValidStyles>
          <ValidForm onSubmit={action('Form Submit')} autoComplete='off'>
            { content }
            </ValidForm>
        </ValidStyles>
      </div>
      <div>
        {js && <SyntaxHighlighter wrapLines={true} language='javascript' style={docco}>
          { js }
        </SyntaxHighlighter> }
        {html && <SyntaxHighlighter wrapLines={true} language='html' style={docco}>
          { html }
        </SyntaxHighlighter> }
      </div>
    </div>
  )
}