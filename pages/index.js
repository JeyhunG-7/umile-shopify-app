import { Heading, Page, Button } from "@shopify/polaris";
// import { useQuery, gql } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { useLazyQuery } from "react-apollo";
import { ResourcePicker } from "@shopify/app-bridge-react";
import gql from "graphql-tag";

const Index = (props) => {
  const [open, setOpen] = useState(false);

  const GET_SHOP_INFOMATION = gql`
    query shop {
      shop {
        name
      }
    }
  `;

  const [loadShopInfo, { called, loading, data, error }] = useLazyQuery(
    GET_SHOP_INFOMATION
  );

  useEffect(() => {
    // if (!called) loadShopInfo();

    console.log("Use effect:", called, loading, data);

    if (loading === false && data) console.log("data: " + data);

    if (error) console.error(error.message);
  }, [loading]);

  return (
    <>
      <Page>
        <Heading>
          Shopify app with Node and React (last edit March 23, 2021)
        </Heading>
        <br />
        <Button
          primary
          onClick={() => {
            console.log("I am clicked");
            setOpen(true);
          }}
        >
          Click Me
        </Button>
      </Page>

      <ResourcePicker
        resourceType="Product"
        open={open}
        onCancel={() => setOpen(false)}
      />
    </>
  );
};

export default Index;
