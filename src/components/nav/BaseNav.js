import React from 'react'

const BaseNav = () => {
  return (
    <div className='px-4 py-2 bg-body'>
        <ul className="nav justify-content-end">
  <li className="nav-item">
    <a className="nav-link" aria-current="page" href="/"><button className='btn btn-primary'>Register</button></a>
  </li>
  <li className="nav-item">
    <a className="nav-link" href="/"><button className='btn btn-primary'>Login</button></a>
  </li>
</ul>
    </div>
  )
}

export default BaseNav