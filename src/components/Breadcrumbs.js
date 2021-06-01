import React from 'react'
import { HashRouter as Router, Route, Switch, Link, withRouter } from 'react-router-dom';
import { Breadcrumb, Alert } from 'antd';

const breadcrumbNameMap = {
  '/apps': 'Application List',
  '/apps/1': 'Application1',
  '/apps/2': 'Application2',
  '/apps/1/detail': 'Detail',
  '/apps/2/detail': 'Detail',
};
const Breadcrumbs = withRouter(props => {
  const { location } = props;
  console.log(location)
  const pathSnippets = location.pathname.split('/').filter(i => i);
  console.log(pathSnippets)
  const extraBreadcrumbItems = pathSnippets.map((_, index) => {
    const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
    return (
      <Breadcrumb.Item key={url}>
        <Link to={url}>{breadcrumbNameMap[url]}</Link>
      </Breadcrumb.Item>
    );
  });
  let breadcrumbItems=[          
  <Breadcrumb.Item key="Home">
    <Link to={"/"}>Home</Link>
</Breadcrumb.Item>]
  let url="/"
  pathSnippets.forEach(p=>{
      url=url+p
      breadcrumbItems.push(
          <Breadcrumb.Item key={p}>
              <Link to={url}>{p}</Link>
          </Breadcrumb.Item>
      )
      url=url+"/"
  })
  return (
    <div className="demo">
      <Breadcrumb>{breadcrumbItems}</Breadcrumb>
    </div>
  );
});

export default Breadcrumbs
