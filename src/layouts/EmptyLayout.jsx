import React from 'react';

// сюда приходит всё что должно отображаться вне лейаута, добавляюься стили, верстка и прочее исходя из потребновтей приложения
const EmptyLayout = props =>
{
    return (
      <>        
        {props.children}
      </>
    );
}

export default EmptyLayout