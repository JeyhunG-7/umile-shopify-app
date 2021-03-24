import React, { useEffect, useState } from "react";
import { useLazyQuery } from "react-apollo";
import { ResourcePicker } from "@shopify/app-bridge-react";
import {
  Heading,
  Page,
  Button,
  ButtonGroup,
  TextStyle,
} from "@shopify/polaris";
import gql from "graphql-tag";

const PrettyPrintJson = React.memo(({ data }) => (
  <div>
    <pre>{JSON.stringify(data, null, 2)}</pre>
  </div>
));

const Index = ({ authFetch }) => {
  const [open, setOpen] = useState(false);
  const [fetchData, setFetchData] = useState(null);
  const [gqlData, setGqlData] = useState(null);

  const GET_SHOP_INFOMATION = gql`
    query {
      shop {
        id
        name
        email
      }
    }
  `;

  const [loadShopInfo, { data }] = useLazyQuery(GET_SHOP_INFOMATION);

  useEffect(() => setGqlData(data), [data]);

  const displayData = fetchData || gqlData;

  const sampleFetchTest = () => {
    authFetch("/api")
      .then((resp) => resp.json())
      .then((data) => setFetchData(data))
      .catch((e) => console.error("Fetch call error", e.message));
  };

  return (
    <>
      <Page>
        <Heading>
          Shopify app with Node and React (last edit March 24, 2021)
        </Heading>
        <br />
        <ButtonGroup>
          <Button onClick={() => setOpen(true)} primary>
            Resource Picker
          </Button>
          <Button
            primary
            onClick={() => {
              setFetchData(null);
              loadShopInfo();
            }}
          >
            GraphQL Query
          </Button>
          <Button
            primary
            onClick={() => {
              setGqlData(null);
              sampleFetchTest();
            }}
          >
            Fetch from BE
          </Button>
        </ButtonGroup>
        <br />
        <TextStyle variation="code">
          {displayData && <PrettyPrintJson data={displayData} />}
        </TextStyle>
      </Page>

      <ResourcePicker
        open={open}
        resourceType="Product"
        onCancel={() => setOpen(false)}
      />
    </>
  );
};

export default Index;
