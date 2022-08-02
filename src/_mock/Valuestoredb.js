import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
// material
import { Box, Card, Link, Typography, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
// utils
import { fCurrency } from '../utils/formatNumber';
// components
import { ColorPreview } from '../components/color-utils';

// ----------------------------------------------------------------------

const ProductImgStyle = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute',
});

// ----------------------------------------------------------------------

ShopProductCard.propTypes = {
  product: PropTypes.object,
};

export default function ShopProductCard() {
 
  return (
    <Card>
      <Box sx={{ pt: '100%', position: 'relative' }}>
        <ProductImgStyle alt="ok" src="https://i.pinimg.com/736x/62/2f/9d/622f9d0cfaf3bdd69fba4046103363e2.jpg" />
      </Box>

      <Stack spacing={2} sx={{ p: 3 }}>
        <Link to="#" color="inherit" underline="hover" component={RouterLink}>
          <Typography variant="subtitle2" noWrap>
            "new product"
          </Typography>
        </Link>

        <Stack direction="row" alignItems="center" justifyContent="space-between">
        
          <Typography variant="subtitle1">
            <Typography
              component="span"
              variant="body1"
              sx={{
                color: 'text.disabled',
                textDecoration: 'line-through',
              }}
            >
              1000
            </Typography>
            &nbsp;
            222
          </Typography>
        </Stack>
      </Stack>
    </Card>
  );
}
