import React, { useEffect, useState } from "react";
import { useLazyQuery } from "react-apollo";
import { ResourcePicker } from "@shopify/app-bridge-react";
import gql from "graphql-tag";
import {
  Heading,
  Page,
  Button,
  ButtonGroup,
  TextStyle,
} from "@shopify/polaris";

const PrettyPrintJson = React.memo(({ data }) => (
  <div>
    <pre>{JSON.stringify(data, null, 2)}</pre>
  </div>
));

const Index = ({ authFetch }) => {
  const [open, setOpen] = useState(false);
  const [displayData, setDisplayData] = useState(null);

  const GET_SHOP_INFOMATION = gql`
    query {
      shop {
        id
        name
        email
      }
    }
  `;

  const [loadShopInfo, { data, called }] = useLazyQuery(GET_SHOP_INFOMATION);

  useEffect(() => setDisplayData(data), [data]);

  const sampleFetchTest = () => {
    authFetch("/api")
      .then((resp) => resp.json())
      .then((data) => setDisplayData(data))
      .catch((e) => console.error("Fetch call error", e.message));
  };

  const reqresFetchTest = () => {
    authFetch("https://reqres.in/api/users?page=2")
      .then((resp) => resp.json())
      .then((data) => setDisplayData(data))
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
              if (called) {
                setDisplayData(data);
              } else {
                loadShopInfo();
              }
            }}
          >
            GraphQL Query
          </Button>
          <Button onClick={() => sampleFetchTest()} primary>
            Fetch from BE
          </Button>
          <Button onClick={() => reqresFetchTest()} primary>
            REST-API (reqres.io)
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
