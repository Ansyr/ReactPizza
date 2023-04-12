import React from "react";
import modules from "./NotFoundblock.module.scss";

export const NotFoundBlock = () => {
  return (
    <div className={modules.root}>
      <h1>
        <span>🤔</span>
        <br />
        Ничего не найдено
      </h1>
      <p className={modules.description}>К сожалению данная страница отсутсвует в нашем интернет магазине</p>
    </div>
  );
};
