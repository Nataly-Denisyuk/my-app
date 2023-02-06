import React from 'react'

import Menu from './Menu'

import { routes } from '../../routes/wellknownRoutes'

import styled from "styled-components";

const Root = styled.div`  
  > div.content {
    padding: 10px;
  }
`


const menuItems = [
  { linkTo: routes.Report1, title: 'Report 1' },
  { linkTo: routes.Report2, title: 'Report 2' },
]


// сюда добавляются меню, сайдбары, футеры ... всё то, что должнл быть на всех страницах. 
// в качестве примера добавим меню с 2мя ссылками
// props.children размещается в отведенное место
const MainLayout = props =>
{
    return (
      <Root>  
        <div>
          <Menu items={menuItems} />
        </div>      
        <div className="content">
          {props.children}
        </div>
      </Root>
    );
}

export default MainLayout