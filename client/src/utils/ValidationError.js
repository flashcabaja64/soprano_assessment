import React from 'react';

export default function ValidationError({ message, submitError }) {
  const submitStyle = {
    'color':'red',
    'fontSize': '1em',
    'marginTop': '0.3em',
    'textAlign': 'center'
  }

  if(message && !submitError) {
    return (
      <div className="error" style={submitStyle}>{message}</div>
    )
  } else {
    return (
      <div className="error" style={submitStyle}>{message}</div>
    )
  }
  return <></>
}