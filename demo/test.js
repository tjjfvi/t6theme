import React from 'react';
import ReactDOM from 'react-dom';
import * as TestUtils from 'react-dom/test-utils';
import CheckboxWithLabel from '../CheckboxWithLabel';

// # foo
// `a` *b* **c**

/*
 * hi `a`
 * 
 */

/**
 * This is some jsdoc with *italics*, **bold**, `code`, and cool stuff like that.
 * 
 * ```ts
 * console.log("woah, it's a code block!");
 * class Foo {
 *   bar = 5;
 * }
 * ```
 */

it('CheckboxWithLabel changes the text after click', () => {
  // Render a checkbox with label in the document
  const checkbox = TestUtils.renderIntoDocument(
    <CheckboxWithLabel labelOn="On" labelOff="Off" />
  )

  const checkboxNode = ReactDOM.findDOMNode(checkbox)

  // Verify that it's Off by default
  expect(checkboxNode.textContent).toEqual('Off')

  // Simulate a click and verify that it is now On
  TestUtils.Simulate.change(
    TestUtils.findRenderedDOMComponentWithTag(checkbox, 'input')
  )
  expect(checkboxNode.textContent).toEqual('On')
})
