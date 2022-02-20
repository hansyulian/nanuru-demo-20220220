import { NextPage } from "next"
import { useCallback, useState, useEffect } from "react";
import * as React from 'react';
import { Grid, CardMedia, Stack, Box, Typography, Container, Button, Card, CardActions, CardContent, Fab, Badge, IconButton, TextField } from '@mui/material';
import { UserCartApi } from "apis/UserCartApi";
import { UserCart } from "frontend-models/UserCart";
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

const Page: NextPage = () => {
  const [userCarts, setUserCarts] = useState<UserCart[]>([]);
  const [userCartCount, setUserCartCount] = useState<number>(0);

  const reloadUserCarts = useCallback(async () => {
    try {
      const result = await UserCartApi.list({});
      setUserCarts(result.records);
      setUserCartCount(result.count);
    } catch (err) {
      console.error(err);
      setUserCarts([]);
      setUserCartCount(0);
    }
  }, [])

  useEffect(() => {
    reloadUserCarts();
  }, [reloadUserCarts])

  const setUserCartAmount = useCallback(async (userCart: UserCart, amount: number) => {
    await UserCartApi.update(userCart.id, amount);
    await reloadUserCarts();
  }, [reloadUserCarts]);

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
          My Cart
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
    <UserCarts records={userCarts} onUpdate={setUserCartAmount} />
  </div>
}

type UserCartsProps = {
  records: UserCart[];
  onUpdate: (item: UserCart, amount: number) => Promise<void>
}
const UserCarts = (props: UserCartsProps) => {
  const { records, onUpdate } = props;
  return <Container sx={{ py: 8 }} maxWidth="lg">
    <Grid container spacing={4}>
      {records.map((record) => <UserCart key={record.id} record={record} onUpdate={(amount: number) => {
        return onUpdate(record, amount)
      }} />)}
    </Grid>
  </Container>
}

type UserCartProps = {
  record: UserCart,
  onUpdate: (amount: number) => Promise<void>
};
const UserCart = (props: UserCartProps) => {
  const { record, onUpdate } = props;
  const [amount, setAmount] = useState<string>(`${record.amount}`);

  function onChange(event: { target: { value: any; }; }) {
    const value = event.target.value;
    setAmount(value)
  }

  useEffect(() => {
    setAmount(`${record.amount}`);
  }, [record])

  function updateAmount() {
    changeAmount(parseInt(amount));
  }

  function changeAmount(amount: number) {
    onUpdate(amount);
  }

  return <Grid item xs={12}>
    <Card
      sx={{ display: 'flex' }}
    >
      <CardMedia
        component="img"
        image={`/api/image/${record.item.imagePath}`}
        sx={{ width: 500 }}
      />
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography component="div" variant="h5">
            {record.item.name}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" component="div">
            {record.item.description}
          </Typography>
        </CardContent>
        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', padding: 1 }}>
          <Fab color='primary' sx={{ marginRight: 2 }} onClick={() => changeAmount(record.amount - 1)}>
            <RemoveIcon />
          </Fab>
          <TextField sx={{ marginRight: 2, MozAppearance: 'textfield' }} type='number' id="outlined-basic" variant="outlined" value={amount} onChange={onChange} onBlur={updateAmount} />
          <Fab color='secondary' sx={{ marginRight: 3 }} onClick={() => changeAmount(record.amount + 1)}>
            <AddIcon />
          </Fab>
          <Fab color='error' onClick={() => changeAmount(0)}>
            <DeleteIcon />
          </Fab>
        </Box>
      </Box>
    </Card>
  </Grid>;
};


export default Page