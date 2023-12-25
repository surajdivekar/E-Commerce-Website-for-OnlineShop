import React from "react";
import UsersMenu from "../../components/Layout/UsersMenu";
import Layout from "../../components/Layout/Layout";

const Production = () => {
  return (
    <Layout>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-2">
            <UsersMenu />
          </div>
          <div className="col-md-10">
            <h1> Production</h1>
          </div>
        </div>
      </div>
    </Layout>
  );
};
export default Production;
