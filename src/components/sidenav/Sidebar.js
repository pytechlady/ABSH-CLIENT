import React from 'react'

const Sidebar = ({main_content, element}) => {
  return (
    <div className="container-fluid">
    <div className="row flex-nowrap">
        <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark bg-gradient">
            <div className="d-flex flex-column align-items-center px-3 pt-2 text-white min-vh-100">
                <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
                    {element}
                </ul>
                <hr/>
            </div>
        </div>
        <div className="col py-3">
            {main_content}
        </div>
    </div>
</div>
  )
}

export default Sidebar