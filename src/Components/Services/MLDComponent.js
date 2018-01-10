import React from 'react';
import { Section, SectionTitle, SectionBody, Paragraph } from '../Shared';


class MLDComponent extends React.Component {

  render() {
    return (
      <React.Fragment>
        <SectionTitle>Manual Lymphatic Drainage</SectionTitle>
        <SectionBody>
          <Paragraph>
            Manual lymphatic drainage (MLD) is a type of massage based on evidence that encouraging the natural circulation and drainage of fluid through pathways in our tissues and blood vessels can relieve swelling from edema and improve health.
          </Paragraph>
          <Paragraph>
            Swelling in the legs, arms, or any area of the body from edema can be mild to very sever. But even mild swelling can cause discomfort, anxiety, and self-consciousness. Fortunately, it can be treated and the swelling reduced, restoring your natural symmetry and aiding your body in ridding itself of unneeded waste and toxins.
          </Paragraph>
        </SectionBody>
      </React.Fragment>
    )
  }
}

export default MLDComponent;