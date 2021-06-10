import React from 'react'
import { Link, withRouter } from 'react-router-dom';
import { Breadcrumb } from 'antd';

const Breadcrumbs = withRouter(props => {
  const { location } = props;

  const pathSnippets = location.pathname.split('/').filter(i => i);

  let breadcrumbItems = [
    <Breadcrumb.Item key="Home">
      <Link to={"/"}>Home</Link>
    </Breadcrumb.Item>]
  let url = "/"
  pathSnippets.forEach(p => {
    url = url + p
    breadcrumbItems.push(
      <Breadcrumb.Item key={p}>
        <Link to={url}>{p.charAt(0).toUpperCase()+p.slice(1)}</Link>
      </Breadcrumb.Item>
    )
    url = url + "/"
  })
  return (
    <div className="demo">
      <Breadcrumb>{breadcrumbItems}</Breadcrumb>
    </div>
  );
});

export default Breadcrumbs
