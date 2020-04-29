import styled from 'styled-components';
import { space, typography } from 'styled-system';

export const Text = styled.p`
  ${space}
  ${typography}
`;

Text.propTypes = {
  ...typography.propTypes,
};

Text.defaultProps = {
  fontSize: 2,
};

export default Text;
