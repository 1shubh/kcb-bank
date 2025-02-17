import React from "react";
import { Svg, Path } from "react-native-svg";
import welcomeIcon from "../assets/icons/ic_payments_place.png";
import signinicon from "../assets/icons/ic_kcb_get_started.png";
import userIcon from "../assets/icons/avatar_white.png";
import greenUser from "../assets/icons/avatar_green.png";
import bankTransferIcon from "../assets/icons/ic_kcb_cash_transfers.png";
import warningIcon from "../assets/icons/image_dialog_confirmation.png";
import mobileTranferIcon from "../assets/icons/ic_kcb_send_mpesa.png";
import otpwaiting from "../assets/icons/otp_wait_otp_waiting.png";
import otpRecived from "../assets/icons/otp_wait_otp_received.png";
import phoneicon from "../assets/icons/ic_kcb_buy_airtime.png";
import insurance from "../assets/icons/insurance.png";
import withdrawicon from "../assets/icons/ic_kcb_withdraw.png";
import cardIcon from "../assets/icons/ic_kcb_card_services.png";
import voompabill from "../assets/icons/ic_new_paybill.png";
import vompaphone from "../assets/icons/ic_new_buy_goods.png";
import schoolBoy from "../assets/icons/ic_new_school_fees.png";
import homeSelected from "../assets/icons/ic_home_selected.png";
import homeUnselected from "../assets/icons/ic_home_unselected.png";
import loanSelected from "../assets/icons/ic_loans_selected.png";
import loanUnselected from "../assets/icons/ic_loans_unselected.png";
import accountSelected from "../assets/icons/ic_account_selected.png";
import accountUnselected from "../assets/icons/ic_account_unselected.png";
import accountAvatar from "../assets/icons/ic_loyalty_avatar.png";
export const BankingIcon = ({ width, height }) => (
  <Svg
    version="1.1"
    id="Layer_1"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    viewBox="0 0 101.14 122.88"
    width={width}
    height={height}
  >
    <Path
      d="M59.07,0c3.72,0,7.07,1.52,9.52,3.95c2.44,2.44,3.95,5.81,3.95,9.52v11.26h-3.87v-7.79H3.88v87.04h64.81V90.4 h3.87v19.01c0,3.72-1.52,7.07-3.95,9.52c-2.44,2.44-5.81,3.95-9.52,3.95H13.47c-3.72,0-7.07-1.52-9.52-3.95 C1.52,116.49,0,113.12,0,109.41V13.47C0,9.75,1.52,6.4,3.95,3.95C6.48,1.43,9.9,0,13.47,0H59.07L59.07,0z M36.28,108.21 c3.04,0,5.52,2.48,5.52,5.52c0,3.04-2.48,5.53-5.52,5.53c-3.04,0-5.52-2.48-5.52-5.53C30.75,110.69,33.22,108.21,36.28,108.21 L36.28,108.21L36.28,108.21L36.28,108.21L36.28,108.21z"
      fillRule="evenodd"
      clipRule="evenodd"
      fill={"white"}
    />
    <Path
      d="M26.63,71.86h11.38v3.68H26.63V71.86L26.63,71.86z M76.96,62.22c2.15,0,4.05,1.02,5.25,2.63 c1.2-1.6,3.12-2.63,5.28-2.63c3.63,0,6.55,2.93,6.55,6.55c0,3.63-2.93,6.58-6.55,6.58c-2.15,0-4.08-1.05-5.28-2.65 c-1.2,1.6-3.1,2.65-5.25,2.65c-3.62,0-6.58-2.95-6.58-6.58C70.38,65.15,73.34,62.22,76.96,62.22L76.96,62.22L76.96,62.22 L76.96,62.22z M96.64,81.77c0.52,0,1-0.22,1.32-0.57c0.35-0.33,0.58-0.8,0.58-1.32V54.87l0,0H21.73v25.01c0,0.52,0.2,1,0.55,1.32 c0.35,0.35,0.83,0.57,1.35,0.57C47.96,81.77,72.31,81.77,96.64,81.77L96.64,81.77z M23.63,84.37c-1.25,0-2.38-0.5-3.18-1.33 c-0.82-0.8-1.32-1.92-1.32-3.17V36.67c0-1.23,0.5-2.35,1.3-3.18c0.82-0.82,1.95-1.32,3.2-1.32l0,0h73.01c1.23,0,2.38,0.5,3.18,1.32 c0.82,0.8,1.33,1.95,1.33,3.18v43.21c0,1.22-0.5,2.35-1.33,3.17c-0.8,0.8-1.95,1.33-3.18,1.33C72.28,84.37,47.98,84.37,23.63,84.37 L23.63,84.37z M21.73,41.89h76.81v-5.23c0-0.5-0.22-0.98-0.58-1.32c-0.35-0.35-0.82-0.58-1.32-0.58H23.63c-0.52,0-1,0.22-1.35,0.58 c-0.35,0.35-0.55,0.82-0.55,1.32V41.89L21.73,41.89L21.73,41.89L21.73,41.89z M43.22,71.86H62.1v3.68H43.22V71.86L43.22,71.86z"
      fillRule="evenodd"
      clipRule="evenodd"
      fill={"white"}
    />
  </Svg>
);

export const icons = {
  welcomeIcon,
  signinicon,
  userIcon,
  greenUser,
  bankTransferIcon,
  warningIcon,
  mobileTranferIcon,
  otpwaiting,
  otpRecived,
  phoneicon,
  insurance,
  withdrawicon,
  cardIcon,
  vompaphone,
  voompabill,
  schoolBoy,
  homeSelected,
  homeUnselected,
  loanSelected,
  loanUnselected,
  accountSelected,
  accountUnselected,
  accountAvatar,
};
