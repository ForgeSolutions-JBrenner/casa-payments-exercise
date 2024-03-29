import express from "express";
import { prices, createSubscription, subscriptionStatus, subscriptions,customerPortal } from "../controllers/subscriptions";
import {requireSignin} from '../middleware'
const router = express.Router();

router.get("/prices", prices);
router.post('/create-subscription', requireSignin, createSubscription)
router.get('/subscription-status', requireSignin, subscriptionStatus)
router.get('/subscriptions', requireSignin, subscriptions)
router.get('/customerportal', requireSignin, customerPortal)

module.exports = router;
