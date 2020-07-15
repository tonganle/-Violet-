(function() {
  const en = {
    message: {
      i18n: 'English',
      language: 'Language',
      login: 'Login',
      welcome: 'Welcome',
      logout: 'Logout',
      changePassword: 'Change Password',
      check: 'Check',
      edit: 'Edit',
      add: 'Add',
      notActive: 'Not Active',
      activation: 'Activation',
      discontinueUse: 'Discontinue Use',

      yes: 'Yes',
      no: 'No',
      operation: 'operation',
      addTo: 'Add',
      del: 'Delete',
      change: 'Change',
      save: 'Save',
      confirm: 'Confirm',
      cancel: 'Cancel',
      serialNumber: 'Serial Number'
    },
    excel: {
      export: 'Export',
      placeholder: 'Please enter the file name(default excel-list)'
    },
    router: {
      homes: 'Home',
      home: 'Home',
      dataBase: 'Base Data',
      baseCode: 'Base Code Management',
      businessManagement: 'Business Management',
      platformManagement: 'Platform Management',
      roleManagement: 'Role Management',
      systemModule: 'System Module',
      enterpriseAdministrator: 'Administrator Management',
      auth: 'authorization Management',
      company: 'company Management',
      advice: 'advice',
      example: 'Example',
      orderManage: 'OrderManage',
      iframe: 'Iframe',
      table: 'Table',
      echarts: 'Echarts',
      text: 'Rich Text Editor',
      tree: 'Tree',
      up: 'Upload',
      upImg: 'Upload pictures',
      upFile: 'Upload Files',
      export: 'Export Excel',
      import: 'Import Excel',
      tinymce: 'Rich Text Editor',
      clipboard: 'Copy',
      jszip: 'Package',
    },
    baseCode: {
      codeClassify: 'Code Classify',
      addClassify: 'Add Classify',
      editClassify: 'Edit Classify',
      delClassify: 'Del Classify',
      addCode: 'Add Code',
      editCode: 'Edit Code',
      delCode: 'Del Code',

      classifyCode: 'Classify Code:',
      classifyName: 'Classify Name:',
      classifySName: 'Classify Abbreviation:',
      classifySortNum: 'Classify Sort Num:',
      mnemonicCode1: 'Mnemonic Code:',

      baseCode: 'Base Code',
      codeName: 'Code Name',
      codeSName: 'Code Abbreviation',
      mnemonicCode2: 'Mnemonic Code',
      sortNum: 'Sort Num',
      remarks: 'Remarks',
      state: 'State'
    },
    enterprise: {
      enterpriseCode: 'Enterprise Code',
      enterpriseName: 'Enterprise Name',
      contacts: 'Contacts',
      attribute: 'Attribute',
      enterpriseSName: 'Enterprise Abbreviation',
      enterpriseBaseInfo: 'Enterprise Base Info',
      customerInfo: 'Customer Info',
      supplierService: 'Supplier Service',
      shipAgencyService: 'Ship Agency Service',
      railwayAgencyService: 'Railway Agency Service',
      highwayServiceInfo: 'Highway Service Info',
      storageInfo: 'Storage Info',
      customsService: 'Customs Service',
      affiliatedEnterpriseInfo: 'Affiliated Enterprise Info',
      shipInfo: 'Ship Info',
      railwayLineInfo: 'Railway Line Info',
      authorizaInfo: 'Authoriza Info'
    },
    baseEnterprise: {
      enterpriseCode: 'Enterprise Code:',
      attribute: 'Attribute:',
      groupEnterprises: 'Group Enterprises:',
      CSName: ' Chinese Abbreviation:',
      CName: 'Chinese Name:',
      parentEnterprises: 'Parent Enterprises:',
      ESName: ' English Abbreviation:',
      EName: 'English Name:',
      enterpriseNature: 'Enterprise Nature:',
      enterpriseAddress: 'Enterprise Address(Chinese):',
      enterpriseSize: 'Enterprise Size:',
      country: 'Country:',
      province: 'Province:',
      city: 'City:',
      town: 'Town:',
      street: 'Street:',
      postalCode: 'Postal Code:',
      detailedAddress: 'Detailed Address:',
      longitude: 'Longitude:',
      latitude: 'Latitude:',
      faxNumber: 'Fax Number:',
      enterpriseEAddress: 'Enterprise Address(English):',
      legalRepresentative: 'Legal Representative:',
      taxNumber: 'Tax Number:',
      contacts: 'Contacts:',
      contactNumber: 'Contact Number:',
      enterpriseStatus: 'Enterprise Status:',
      mailBox: 'Mail Box:',
      remarks: 'Remarks:'
    },
    accounts: {
      bankAccount: 'Bank Account',
      enterpriseName: 'Enterprise Name',
      axpayerID: 'Axpayer ID',
      openingBank: 'Opening Bank',
      account: 'Account',
      openingaddress: 'Opening Address',
      telephone: 'Telephone',
      currency: 'Currency',
      isBaseAccount: 'Is Base Account',
      bankAccountStatus: 'Bank Account Status'
    },
    contacts: {
      businessContacts: 'Business Contacts',
      name: 'Name',
      enterpriseCode: 'Enterprise Code',
      departments: 'Departments',
      duty: 'Duty',
      gender: 'Gender',
      contactBusinessScope: 'Contact Business Scope',
      unitPhone: 'Unit Phone',
      phoneNumber: 'Phone Number',
      email: 'Email',
      faxNumber: 'Fax Number',
      contactStatus: 'Contact Status',
      remarks: 'Remarks'
    },
    customerInfo: {
      customerSource: 'Customer Source',
      customerLevel: 'Customer Level',
      customerCategory: 'Customer Category',
      commodityCategory: 'Commodity Category',
      followUpSales: 'Follow Up Sales',
      customerStatus: 'Customer Status'
    },
    supplierService: {
      shipBookingAgent: 'Ship Booking Agent',
      railwayLineAgent: 'Railway LineAgent',
      roadTransport: 'Road Transport',
      customsService: 'Customs Service',
      storageService: 'Storage Service'
    },
    shipAgencyService: {
      FCL: 'FCL',
      LCL: 'LCL',
      shipAdvantage: 'List of Advantage Routes for Shipping Reservation Agents',
      shipRoutes: 'List of port of call for routes',
      serialNumber: 'Serial Number',
      companyAbbreviation: 'Company Abbreviation',
      advantageRouteCoding: 'Advantage Route Coding',
      advantageRouteName: 'Advantage Route Name',
      remarks: 'Remarks',
      chineseAbbreviation: 'Chinese Abbreviation',
      berthingPortArea: 'Berthing PortArea',
      isDirect: 'Is Direct',
      berthingDaily: 'Berthing Daily',
      departureDaily: 'Departure Daily'
    },
    railwayAgencyService: {
      railwayLineAdvantage: 'List of Advantage Lines of Railway Line Agents',
      lineAbbreviation: 'Enterprises Line Abbreviation',
      advantageLineCoding: 'Advantage Line Coding',
      advantageLineName: 'Advantage Line Name'
    }
  }

  // 挂载在 _I18N_ 上
  if (window._I18N_) {
    window._I18N_.en = en
  } else {
    window._I18N_ = {}
    window._I18N_.en = en
  }
})()
