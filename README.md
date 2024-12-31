# Toby Boiler Plate

This is my customized version of [Original Boilerplate Name](link-to-original-repo), modified to include additional features and configurations.

# Frontend Accelerator
#### Note: Exclusively for members of the Frontend Accelerator
### 📣 Join the community: https://discord.gg/aaDMVKrUJ2

Follow these steps to get you started:
- [Step 1 - Choose database provider (Firestore, MongoDB)](#step-1---database)
- [Step 2 - Choose payment provider (Stripe, LemonSqueezy)](#step-2---payment)
- [Step 3 - Choose authentication providers (Google, Facebook, Magic link)](#step-3---authentication)
- [Step 4 - Configure and test your app](#step-4---run-and-test-your-app)
## Step 1 - database
### Firestore 🔥
1. If you haven't already create a firebase project: https://firebase.google.com/docs/firestore/quickstart.
2. Add Firestore database, to your project in Firebase
3. In Firebase side panel, navigate to: `Project Overview -> Project Settings -> Service Accounts -> Generate new private key` to generate service account json file, which contains private key. You can also visit this URL: `https://console.firebase.google.com/u/0/project/{project-id}/settings/serviceaccounts/adminsdk` but replace the `{project-id}` with your project.
[See image](https://i.ibb.co/x7zCDCj/Screenshot-2024-08-28-at-20-54-39.png)
4. Set following `.env` variables: <br />
`AUTH_FIREBASE_PROJECT_ID` - id of your firebase project<br />
`AUTH_FIREBASE_CLIENT_EMAIL` - service account email (get it from step 3 json file) <br />
`AUTH_FIREBASE_PRIVATE_KEY` - private key (get it from step 3 json file)
5. Now your Firestore is setup :)

### MongoDB 🧩
1. Create MongoDB account and cluster if you haven't already: https://account.mongodb.com/account/register
2. Now we need to create an extra user which will be only used by our app. It needs to have read/write access. In side panel, go to `Security -> Database Access -> Add new Database user`
[See image](https://i.ibb.co/BPk2wKT/mongo-setup-1.png)
3. Now we need to get "connection string" URI. In side panel, go to `Deployment -> Database -> Connect`. After modal opens, select `Drivers` and at the bottom you will see connection string looking like `mongodb+srv://<db_username>:<db_password>@...`
[See image](https://i.ibb.co/179rHFQ/mongo-setup-2.png)
4. Set following `.env` variables: <br />
`MONGO_DB_URI` - connection string from step 3 <br />
**Note**: Make sure that after first `/` in connection string, you write the DB name which you want (otherwise by default it's `test`). Example `mongodb+srv://{username}:{password}.../dbName`
5. Now your MongoDB is setup :)

## Step 2 - payment
### Stripe 💰
1. Create Stripe account: https://dashboard.stripe.com/register
2. Create `public` and `secret` key in here test or prod: https://dashboard.stripe.com/test/apikeys
3. Create `webhook` key: https://dashboard.stripe.com/test/webhooks 
4. Set `.env` variables:<br/>
`STRIPE_PUBLIC_KEY=pk_...` <br/>
`STRIPE_SECRET_KEY=sk_...` <br/>
`STRIPE_WEBHOOK_SECRET=whsec_...`
5. Now your Stripe setup is ready and you can add products :)
Documentation: https://docs.stripe.com/keys

### LemonSqueezy 🍋
1. Create account: https://app.lemonsqueezy.com/dashboard
2. Create `api` keys: https://app.lemonsqueezy.com/settings/api
3. Create `webhook` key: https://app.lemonsqueezy.com/settings/webhooks
4. Set `.env` variables:<br/>
`LEMON_SQUEEZY_API_KEY=` <br />
`LEMON_SQUEEZY_WEBHOOK_SECRET`=<br />
5. Now your LemonSqueezy setup is ready and you can add products :)
Documentation: https://docs.lemonsqueezy.com/guides/developer-guide/getting-started


## Step 3 - authentication
### Google 🟨

1. If you are using Firestore you can add Google authentication through there (see image)
2. If you are not, you need to create it through Google console: https://support.google.com/cloud/answer/6158849?hl=en 
3. Set in `.env` variables:<br/>
`GOOGLE_ID=` <br/>
`GOOGLE_SECRET=`<br/>
3. **Remember to whitelist/allow localhost!** Otherwise you won't be able to test it locally.


### Facebook 🟦
1. Create app through developer portal: https://developers.facebook.com
2. Set `.env` variables: <br/>
`FACEBOOK_APP_ID=` <br/>
`FACEBOOK_SECRET=`

### Magic link (email) 🪄
1. Get the following from your email provider and set these `.env` variables: <br/>
`EMAIL_SERVER_USER=`<br/>
`EMAIL_SERVER_PASSWORD=`<br/>
`EMAIL_SERVER_HOST=`<br/>
`EMAIL_SERVER_PORT=`<br/>
`EMAIL_FROM=` (email account you want to get replies on) <br/>
_Note: Magic links require database to be setup._

## Step 4 - run and test your app
If you setup API keys for Database and Payment proceed to these steps.
1. Set following `.env` variables: <br/>
`SITE_URL=` <br >
`NEXTAUTH_URL=` <br />
`NEXTAUTH_SECRET=` <br />
1. Configure `appConfig.ts` to your needs. Core app functionality is controlled from here.
2. Set your `DatabaseProvider` and `PaymentProvider` to the one which you got API keys for
![](https://i.imghippo.com/files/ujhrb1725038529.png)
3. Create products/subscriptions in your payment provider and set `priceId` in the appConfig.
4. Run `npm install` and `npm run dev` to test your app :)

_Note: Remember to rename `.env.example` to `.env` and not commit it to Github!_

TIP: For testing webhooks locally you can use https://webhook.site/ which can forward webhooks to localhost. 

### You are now ready to launch! 🚀

## Localization
Localization is implemented using [Next-intl](https://next-intl.dev/docs/getting-started/app-router/with-i18n-routing) library. Out of the box `en` and `de` are implemented as examples, together with `<LocaleSwitcher>` component. <br />
#### Locales
Locales can be set and configured in the `i18n/config.ts` file.

#### Locales in URL's
Currently default locale is hidden from url, only any additional locales will be visible in the url.
- `en` _will not_ be shown in url -> website.com/members
- `de` _will be_ shown in url -> website.com/de/members

Showing default locale in the URL can be controlled through `i18n/routing.ts` file with option of `localePrefix` set to `always` or `as-needed`. Additionally, you will need to comment out rewriting in `middleware.ts`. Then your default locale will be shown in the url. <br /><br />
For more info and options check the official documentation: https://next-intl.dev/docs/getting-started/app-router/with-i18n-routing

#### Using locales
You define translations inside `i18n/messages`. Afterwards you can access them through a hook `useTranslations(<namespace>)`. See example on the Homepage.

#### Linking and navigating
To ensure proper navigation remember to use `<Link>` component from `i18n/routing` rather then the `next/link`.