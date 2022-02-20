import { NextPage } from "next"
import { useCallback, useState, useEffect } from "react";
import * as React from 'react';
import { Grid, CardMedia, Stack, Box, Typography, Container, Button, Card, CardActions, CardContent, Fab, Badge } from '@mui/material';
import { ItemApi } from "apis/ItemApi";
import { Item } from "frontend/models/Item";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { UserCartApi } from "apis/UserCartApi";
import styles from 'styles/Shop.module.css'


const Page: NextPage = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [itemCount, setItemCount] = useState<number>(0);
  const [cartTotal, setCartTotal] = useState<number>(0);

  const reloadItems = useCallback(async () => {
    try {
      const result = await ItemApi.list({});
      setItems(result.records);
      setItemCount(result.count);
    } catch (err) {
      console.error(err);
      setItems([]);
      setItemCount(0);
    }
  }, [])

  const reloadUserCartInfo = useCallback(async () => {
    try {
      const result = await UserCartApi.info()
      setCartTotal(result.total);
    } catch (err) {
      console.error(err);
      setCartTotal(0);
    }
  }, [])

  useEffect(() => {
    reloadItems();
  }, [reloadItems])

  useEffect(() => {
    reloadUserCartInfo();
  }, [reloadUserCartInfo])


  const addItem = useCallback(async (item: Item) => {
    await UserCartApi.add(item.id, 1);
    await reloadUserCartInfo();
  }, [reloadUserCartInfo]);

  return <div>
    <Box
      sx={{
        bgcolor: 'background.paper',
        pt: 8,
        pb: 6,
      }}
    >
      <Container maxWidth="sm">
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="text.primary"
          gutterBottom
        >
          Nanuru Shop
        </Typography>
        <Stack
          sx={{ pt: 4 }}
          direction="row"
          spacing={2}
          justifyContent="center"
        >
        </Stack>
      </Container>
    </Box>
    <Items records={items} onAdd={addItem} />
    <CartSummary total={cartTotal} />
  </div>
}

type CartProps = {
  total: number,
}
const CartSummary = (props: CartProps) => {
  const { total } = props;
  return <a className={styles['shopping-cart']} href='/cart'>
    <Fab color='primary' variant="extended">
      <Badge badgeContent={total} color='secondary'>
        <ShoppingCartIcon />
      </Badge>
      &nbsp;
      My Cart

    </Fab>
  </a >
}

type ItemsProps = {
  records: Item[];
  onAdd: (item: Item, amount?: number) => {}
}
const Items = (props: ItemsProps) => {
  const { records, onAdd } = props;
  return <Container sx={{ py: 8 }} maxWidth="xl">
    <Grid container spacing={4}>
      {records.map((item) => <Item key={item.id} record={item} onAdd={() => onAdd(item, 1)} />)}
    </Grid>
  </Container>
}

type ItemProps = {
  record: Item,
  onAdd: () => {}
};
const Item = (props: ItemProps) => {
  const { record, onAdd } = props;
  return <Grid item xs={12} sm={6} md={4}>
    <Card
      sx={{ display: 'flex', flexDirection: 'column' }}
    >
      <CardMedia
        component="img"
        image={`/api/image/${record.imagePath}`}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h5" component="h2">
          {record.name}
        </Typography>
        <Typography gutterBottom component="h2">
          {record.description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={onAdd}>
          <AddShoppingCartIcon />
        </Button>
      </CardActions>
    </Card>
  </Grid>;
};


export default Page