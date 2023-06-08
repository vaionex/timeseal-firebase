Congratulations on successfully installing the TimeSeal Firebase Extension! This guide will walk you through configuring the extension with your TimeSeal API key and setting up your collections, fields, and encryption method.

### See it in action

Make any change (create, update, delete) to the ${param:COLLECTION_PATH} collection.
Any change you make will be TimeStamped and available in your TimeSeal dashboard.


### Configuring TimeSeal

To use the TimeSeal Firebase Extension, you need a TimeSeal API key. If you haven't obtained this yet, follow these steps:

1. Sign in to your TimeSeal account.
2. Create a new project within your TimeSeal dashboard.
3. After creating the project, you will receive an API key. Make sure to store this key securely.

### Setting up the Firebase Extension

With your API key, you can now configure the TimeSeal Firebase Extension in your Firebase project:

1. Navigate to the "Extensions" page in your Firebase console.
2. Find the TimeSeal extension and click on "Configure".
3. In the configuration options, enter your TimeSeal API key.
4. Save your changes.

### Specifying Collection and Fields

In the extension configuration, you also need to specify which Firestore collection(s) and fields you want to timestamp:

1. In the configuration options, find the "Collection" input field.
2. Enter the name of the Firestore collection you want to timestamp.
3. In the "Fields" input field, enter the names of the fields you want to timestamp, separated by commas.
4. Save your changes.

### Choosing Storage Method

TimeSeal provides several storage methods for your timestamps: fully onchain, hashed, salted-hash, and encrypted. To choose your preferred method:

1. In the configuration options, find the "Storage Method" dropdown menu.
2. Select your desired encryption method from the dropdown.
3. Save your changes.

With these settings, TimeSeal will automatically add timestamps to the specified fields in the specified collection, using your chosen encryption method.
