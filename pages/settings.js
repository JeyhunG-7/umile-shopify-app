import React from "react";
import {
  Button,
  Card,
  Form,
  FormLayout,
  Layout,
  Page,
  Stack,
  TextField,
} from "@shopify/polaris";

const Settings = () => {
  return (
    <Page>
      <Layout>
        <Layout.AnnotatedSection
          title="Umile Authentication"
          description="Add a API key and secret to validate identity"
        >
          <Card sectioned>
            <Form onSubmit={() => console.log("On submit")}>
              <FormLayout>
                <TextField label="API key" />
                <TextField label="API secret" />
                <Stack distribution="trailing">
                  <Button primary submit>
                    Save
                  </Button>
                </Stack>
              </FormLayout>
            </Form>
          </Card>
        </Layout.AnnotatedSection>

        <Layout.AnnotatedSection
          title="Delivery Zones"
          description="Enable delivery zones for automatic order filtering"
        >
          No delivery zones added yet
          <Button primary submit>
            Add
          </Button>
        </Layout.AnnotatedSection>
      </Layout>
    </Page>
  );
};

export default Settings;
