import React from "react";
import Layout from "../../components/Layout/Layout";
import UsersMenu from "../../components/Layout/UsersMenu";

const Estimation = () => {
  return (
    <Layout>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-2">
            <UsersMenu />
          </div>
          <div className="col-md-10">
            <h1>Estimation</h1>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Estimation;
