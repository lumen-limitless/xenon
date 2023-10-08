export default function Loading() {
  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-background">
      <svg
        className="animate-fade-in-slow"
        width="284"
        height="87"
        viewBox="0 0 284 87"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M56.157 9.17599L38.365 42.2C37.9383 43.224 37.9383 44.2053 38.365 45.144L56.157 78.424C57.181 80.3867 57.1383 82.3067 56.029 84.184C54.8343 86.0613 53.1277 87 50.909 87H47.069C44.5943 87 42.8877 85.976 41.949 83.928L29.789 61.4C29.7037 61.0587 29.4477 60.888 29.021 60.888C28.6797 60.888 28.4237 61.0587 28.253 61.4L16.093 83.928C15.7517 84.8667 15.069 85.6347 14.045 86.232C13.1063 86.744 12.0823 87 10.973 87H7.005C4.87167 87 3.20767 86.0613 2.013 84.184C0.903667 82.3067 0.861 80.3867 1.885 78.424L19.677 45.144C20.1037 44.2053 20.1037 43.224 19.677 42.2L1.885 9.17599C0.861 7.04266 0.903667 5.08 2.013 3.28799C3.20767 1.41066 4.87167 0.471992 7.005 0.471992H10.973C13.277 0.471992 14.9837 1.49599 16.093 3.544L28.253 26.2C28.4237 26.5413 28.6797 26.712 29.021 26.712C29.3623 26.712 29.6183 26.5413 29.789 26.2L41.949 3.544C43.0583 1.49599 44.765 0.471992 47.069 0.471992H51.037C53.1703 0.471992 54.8343 1.41066 56.029 3.28799C57.1383 5.08 57.181 7.04266 56.157 9.17599ZM113.331 48.984C113.331 51.544 112.691 53.9333 111.411 56.152C110.131 58.2853 108.424 60.0347 106.291 61.4C104.158 62.68 101.768 63.32 99.123 63.32H84.019C83.5923 63.32 83.1657 63.4907 82.739 63.832C82.3977 64.088 82.227 64.4293 82.227 64.856V70.232C82.227 70.6587 82.3977 71.0427 82.739 71.384C83.1657 71.7253 83.5923 71.896 84.019 71.896H99.123C100.744 71.896 102.11 72.4507 103.219 73.56C104.414 74.6693 105.011 76.0773 105.011 77.784V81.112C105.011 82.7333 104.414 84.1413 103.219 85.336C102.11 86.4453 100.744 87 99.123 87H81.331C77.4057 87 74.035 85.6347 71.219 82.904C68.403 80.088 66.995 76.6747 66.995 72.664V35.032C66.995 32.3867 67.635 29.9973 68.915 27.864C70.2803 25.7307 72.0297 24.024 74.163 22.744C76.2963 21.3787 78.6857 20.696 81.331 20.696H99.123C101.768 20.696 104.158 21.3787 106.291 22.744C108.424 24.024 110.131 25.7307 111.411 27.864C112.691 29.9973 113.331 32.3867 113.331 35.032V48.984ZM98.227 46.424V37.72C98.227 37.208 98.0137 36.7813 97.587 36.44C97.2457 36.0987 96.8617 35.928 96.435 35.928H84.019C83.5923 35.928 83.1657 36.0987 82.739 36.44C82.3977 36.7813 82.227 37.208 82.227 37.72V46.424C82.227 46.7653 82.3977 47.1067 82.739 47.448C83.1657 47.7893 83.5923 47.96 84.019 47.96H96.435C96.8617 47.96 97.2457 47.7893 97.587 47.448C98.0137 47.1067 98.227 46.7653 98.227 46.424ZM170.081 81.112C170.081 82.7333 169.526 84.1413 168.417 85.336C167.308 86.4453 165.942 87 164.321 87H160.737C159.116 87 157.75 86.4453 156.641 85.336C155.532 84.1413 154.977 82.7333 154.977 81.112V37.72C154.977 37.208 154.764 36.7813 154.337 36.44C153.996 36.0987 153.612 35.928 153.185 35.928H140.769C140.342 35.928 139.916 36.0987 139.489 36.44C139.148 36.7813 138.977 37.208 138.977 37.72V81.112C138.977 82.7333 138.422 84.1413 137.313 85.336C136.204 86.4453 134.838 87 133.217 87H129.633C128.012 87 126.604 86.4453 125.409 85.336C124.3 84.1413 123.745 82.7333 123.745 81.112V35.032C123.745 32.3867 124.385 29.9973 125.665 27.864C127.03 25.6453 128.78 23.896 130.913 22.616C133.046 21.336 135.436 20.696 138.081 20.696H155.873C158.518 20.696 160.908 21.336 163.041 22.616C165.174 23.896 166.881 25.6453 168.161 27.864C169.441 29.9973 170.081 32.3867 170.081 35.032V81.112ZM226.831 72.664C226.831 76.6747 225.423 80.088 222.607 82.904C219.876 85.6347 216.548 87 212.623 87H194.831C190.906 87 187.535 85.6347 184.719 82.904C181.903 80.088 180.495 76.6747 180.495 72.664V35.032C180.495 32.3867 181.135 29.9973 182.415 27.864C183.78 25.6453 185.53 23.896 187.663 22.616C189.796 21.336 192.186 20.696 194.831 20.696H212.623C215.268 20.696 217.658 21.336 219.791 22.616C221.924 23.896 223.631 25.6453 224.911 27.864C226.191 29.9973 226.831 32.3867 226.831 35.032V72.664ZM211.727 70.232V37.72C211.727 37.208 211.514 36.7813 211.087 36.44C210.746 36.0987 210.362 35.928 209.935 35.928H197.519C197.092 35.928 196.666 36.0987 196.239 36.44C195.898 36.7813 195.727 37.208 195.727 37.72V70.232C195.727 70.6587 195.898 71.0427 196.239 71.384C196.666 71.7253 197.092 71.896 197.519 71.896H209.935C210.362 71.896 210.746 71.7253 211.087 71.384C211.514 71.0427 211.727 70.6587 211.727 70.232ZM283.581 81.112C283.581 82.7333 283.026 84.1413 281.917 85.336C280.808 86.4453 279.442 87 277.821 87H274.237C272.616 87 271.25 86.4453 270.141 85.336C269.032 84.1413 268.477 82.7333 268.477 81.112V37.72C268.477 37.208 268.264 36.7813 267.837 36.44C267.496 36.0987 267.112 35.928 266.685 35.928H254.269C253.842 35.928 253.416 36.0987 252.989 36.44C252.648 36.7813 252.477 37.208 252.477 37.72V81.112C252.477 82.7333 251.922 84.1413 250.813 85.336C249.704 86.4453 248.338 87 246.717 87H243.133C241.512 87 240.104 86.4453 238.909 85.336C237.8 84.1413 237.245 82.7333 237.245 81.112V35.032C237.245 32.3867 237.885 29.9973 239.165 27.864C240.53 25.6453 242.28 23.896 244.413 22.616C246.546 21.336 248.936 20.696 251.581 20.696H269.373C272.018 20.696 274.408 21.336 276.541 22.616C278.674 23.896 280.381 25.6453 281.661 27.864C282.941 29.9973 283.581 32.3867 283.581 35.032V81.112Z"
          fill="url(#paint0_linear_1_2)"
          fillOpacity="0.8"
        />
        <path
          d="M56.157 9.17599L57.0374 9.6503L57.0484 9.62976L57.0585 9.60873L56.157 9.17599ZM38.365 42.2L37.4846 41.7257L37.4611 41.7695L37.4419 41.8154L38.365 42.2ZM38.365 45.144L37.4546 45.5578L37.4679 45.5871L37.4831 45.6155L38.365 45.144ZM56.157 78.424L57.0436 77.9614L57.0389 77.9525L56.157 78.424ZM56.029 84.184L56.8727 84.7209L56.8815 84.7069L56.8899 84.6927L56.029 84.184ZM41.949 83.928L42.8581 83.5113L42.8445 83.4817L42.829 83.453L41.949 83.928ZM29.789 61.4L28.8189 61.6425L28.8493 61.7644L28.909 61.875L29.789 61.4ZM28.253 61.4L29.133 61.875L29.1404 61.8612L29.1474 61.8472L28.253 61.4ZM16.093 83.928L15.213 83.453L15.1782 83.5174L15.1532 83.5863L16.093 83.928ZM14.045 86.232L14.5239 87.1099L14.5365 87.103L14.5489 87.0958L14.045 86.232ZM2.013 84.184L1.15207 84.6927L1.16047 84.7069L1.16934 84.7209L2.013 84.184ZM1.885 78.424L1.00307 77.9525L0.998415 77.9614L1.885 78.424ZM19.677 45.144L20.5589 45.6155L20.5741 45.5871L20.5874 45.5578L19.677 45.144ZM19.677 42.2L20.6001 41.8154L20.581 41.7695L20.5574 41.7257L19.677 42.2ZM1.885 9.17599L0.983477 9.60873L0.993573 9.62976L1.00464 9.6503L1.885 9.17599ZM2.013 3.28799L1.16927 2.75108L1.16274 2.76164L2.013 3.28799ZM16.093 3.544L16.9741 3.07108L16.9723 3.06772L16.093 3.544ZM28.253 26.2L29.1474 25.7528L29.141 25.7398L29.1341 25.7271L28.253 26.2ZM29.789 26.2L28.9079 25.7271L28.901 25.7398L28.8946 25.7528L29.789 26.2ZM41.949 3.544L41.0697 3.06771L41.0679 3.07109L41.949 3.544ZM56.029 3.28799L56.8793 2.7616L56.8727 2.75112L56.029 3.28799ZM55.2766 8.70169L37.4846 41.7257L39.2454 42.6743L57.0374 9.6503L55.2766 8.70169ZM37.4419 41.8154C36.9175 43.074 36.9036 44.3456 37.4546 45.5578L39.2754 44.7302C38.973 44.065 38.9592 43.374 39.2881 42.5846L37.4419 41.8154ZM37.4831 45.6155L55.2751 78.8955L57.0389 77.9525L39.2469 44.6725L37.4831 45.6155ZM55.2704 78.8866C56.1375 80.5485 56.0983 82.101 55.1681 83.6753L56.8899 84.6927C58.1783 82.5123 58.2245 80.2249 57.0436 77.9614L55.2704 78.8866ZM55.1853 83.6471C54.1736 85.237 52.7845 86 50.909 86V88C53.4708 88 55.4951 86.8856 56.8727 84.7209L55.1853 83.6471ZM50.909 86H47.069V88H50.909V86ZM47.069 86C45.9691 86 45.1117 85.773 44.4475 85.3745C43.7894 84.9796 43.2548 84.377 42.8581 83.5113L41.0399 84.3447C41.5818 85.527 42.37 86.4604 43.4185 87.0895C44.461 87.715 45.6942 88 47.069 88V86ZM42.829 83.453L30.669 60.925L28.909 61.875L41.069 84.403L42.829 83.453ZM30.7591 61.1575C30.6654 60.7826 30.4524 60.4271 30.0877 60.1839C29.7432 59.9543 29.358 59.888 29.021 59.888V61.888C29.1107 61.888 29.0668 61.907 28.9783 61.848C28.9324 61.8175 28.8915 61.7766 28.861 61.7307C28.8316 61.6867 28.8214 61.6527 28.8189 61.6425L30.7591 61.1575ZM29.021 59.888C28.6753 59.888 28.3283 59.9773 28.0183 60.1839C27.7146 60.3864 27.5032 60.6635 27.3586 60.9528L29.1474 61.8472C29.1734 61.7952 29.1754 61.8162 29.1277 61.848C29.1048 61.8633 29.0796 61.8747 29.0557 61.8815C29.0327 61.8881 29.0195 61.888 29.021 61.888V59.888ZM27.373 60.925L15.213 83.453L16.973 84.403L29.133 61.875L27.373 60.925ZM15.1532 83.5863C14.9061 84.2659 14.4027 84.8656 13.5411 85.3682L14.5489 87.0958C15.7353 86.4037 16.5973 85.4674 17.0328 84.2697L15.1532 83.5863ZM13.5661 85.3541C12.78 85.7829 11.9215 86 10.973 86V88C12.2431 88 13.4327 87.7051 14.5239 87.1099L13.5661 85.3541ZM10.973 86H7.005V88H10.973V86ZM7.005 86C5.23098 86 3.87732 85.251 2.85666 83.6471L1.16934 84.7209C2.53801 86.8717 4.51235 88 7.005 88V86ZM2.87393 83.6753C1.94367 82.101 1.9045 80.5485 2.77159 78.8866L0.998415 77.9614C-0.182499 80.2249 -0.136339 82.5123 1.15207 84.6927L2.87393 83.6753ZM2.76688 78.8955L20.5589 45.6155L18.7951 44.6725L1.00312 77.9525L2.76688 78.8955ZM20.5874 45.5578C21.1384 44.3456 21.1245 43.074 20.6001 41.8154L18.7539 42.5846C19.0828 43.374 19.069 44.065 18.7666 44.7302L20.5874 45.5578ZM20.5574 41.7257L2.76536 8.70169L1.00464 9.6503L18.7966 42.6743L20.5574 41.7257ZM2.78652 8.74326C1.88871 6.87282 1.95807 5.27659 2.86327 3.81435L1.16274 2.76164C-0.150733 4.8834 -0.166707 7.21251 0.983477 9.60873L2.78652 8.74326ZM2.85666 3.82487C3.87732 2.22098 5.23098 1.47199 7.005 1.47199V-0.528008C4.51235 -0.528008 2.53801 0.600343 1.16934 2.75112L2.85666 3.82487ZM7.005 1.47199H10.973V-0.528008H7.005V1.47199ZM10.973 1.47199C11.9728 1.47199 12.7917 1.69261 13.4665 2.09749C14.1419 2.50271 14.7296 3.12662 15.2137 4.02028L16.9723 3.06772C16.347 1.91337 15.5268 1.00128 14.4955 0.382502C13.4636 -0.236623 12.2772 -0.528008 10.973 -0.528008V1.47199ZM15.2119 4.01691L27.3719 26.6729L29.1341 25.7271L16.9741 3.07109L15.2119 4.01691ZM27.3586 26.6472C27.5032 26.9365 27.7146 27.2136 28.0183 27.416C28.3283 27.6227 28.6753 27.712 29.021 27.712V25.712C29.0195 25.712 29.0327 25.7119 29.0557 25.7185C29.0796 25.7253 29.1048 25.7367 29.1277 25.7519C29.1754 25.7838 29.1734 25.8048 29.1474 25.7528L27.3586 26.6472ZM29.021 27.712C29.3667 27.712 29.7137 27.6227 30.0237 27.416C30.3274 27.2136 30.5388 26.9365 30.6834 26.6472L28.8946 25.7528C28.8686 25.8048 28.8666 25.7838 28.9143 25.7519C28.9372 25.7367 28.9625 25.7253 28.9863 25.7185C29.0093 25.7119 29.0225 25.712 29.021 25.712V27.712ZM30.6701 26.6729L42.8301 4.01691L41.0679 3.07109L28.9079 25.7271L30.6701 26.6729ZM42.8283 4.02028C43.3124 3.12662 43.9001 2.50271 44.5755 2.09749C45.2503 1.69261 46.0692 1.47199 47.069 1.47199V-0.528008C45.7648 -0.528008 44.5784 -0.236623 43.5465 0.382501C42.5152 1.00128 41.695 1.91337 41.0697 3.06772L42.8283 4.02028ZM47.069 1.47199H51.037V-0.528008H47.069V1.47199ZM51.037 1.47199C52.811 1.47199 54.1647 2.22098 55.1853 3.82487L56.8727 2.75112C55.504 0.600343 53.5297 -0.528008 51.037 -0.528008V1.47199ZM55.1787 3.81435C56.0839 5.27659 56.1533 6.87282 55.2555 8.74326L57.0585 9.60873C58.2087 7.21251 58.1927 4.8834 56.8793 2.76164L55.1787 3.81435ZM111.411 56.152L112.268 56.6665L112.273 56.6591L112.277 56.6517L111.411 56.152ZM106.291 61.4L106.805 62.2575L106.818 62.2501L106.83 62.2423L106.291 61.4ZM82.739 63.832L83.339 64.632L83.3515 64.6226L83.3637 64.6129L82.739 63.832ZM82.739 71.384L82.0319 72.0911L82.0711 72.1303L82.1143 72.1649L82.739 71.384ZM103.219 73.56L102.512 74.2671L102.525 74.2802L102.539 74.2928L103.219 73.56ZM103.219 85.336L103.926 86.0431L103.926 86.0431L103.219 85.336ZM71.219 82.904L70.5119 83.6111L70.5173 83.6165L70.5229 83.6219L71.219 82.904ZM68.915 27.864L68.0727 27.3249L68.0649 27.3371L68.0575 27.3495L68.915 27.864ZM74.163 22.744L74.6775 23.6015L74.6899 23.5941L74.7021 23.5863L74.163 22.744ZM106.291 22.744L105.752 23.5863L105.764 23.5941L105.777 23.6015L106.291 22.744ZM111.411 27.864L112.268 27.3495L112.268 27.3495L111.411 27.864ZM97.587 36.44L96.8799 37.1471L96.9191 37.1863L96.9623 37.2209L97.587 36.44ZM82.739 36.44L82.1143 35.6591L82.0711 35.6937L82.0319 35.7329L82.739 36.44ZM82.739 47.448L82.0319 48.1551L82.0711 48.1943L82.1143 48.2289L82.739 47.448ZM97.587 47.448L96.9623 46.6671L96.9191 46.7017L96.8799 46.7409L97.587 47.448ZM112.331 48.984C112.331 51.3685 111.737 53.5855 110.545 55.6523L112.277 56.6517C113.645 54.2812 114.331 51.7195 114.331 48.984H112.331ZM110.554 55.6375C109.354 57.636 107.758 59.2741 105.752 60.5577L106.83 62.2423C109.091 60.7953 110.908 58.9347 112.268 56.6665L110.554 55.6375ZM105.777 60.5425C103.809 61.7233 101.599 62.32 99.123 62.32V64.32C101.938 64.32 104.507 63.6367 106.805 62.2575L105.777 60.5425ZM99.123 62.32H84.019V64.32H99.123V62.32ZM84.019 62.32C83.3081 62.32 82.6678 62.6084 82.1143 63.0511L83.3637 64.6129C83.6636 64.373 83.8766 64.32 84.019 64.32V62.32ZM82.139 63.032C81.5459 63.4769 81.227 64.1146 81.227 64.856H83.227C83.227 64.7441 83.2495 64.6991 83.339 64.632L82.139 63.032ZM81.227 64.856V70.232H83.227V64.856H81.227ZM81.227 70.232C81.227 70.9596 81.5299 71.5891 82.0319 72.0911L83.4461 70.6769C83.2655 70.4962 83.227 70.3578 83.227 70.232H81.227ZM82.1143 72.1649C82.6678 72.6076 83.3081 72.896 84.019 72.896V70.896C83.8766 70.896 83.6636 70.843 83.3637 70.6031L82.1143 72.1649ZM84.019 72.896H99.123V70.896H84.019V72.896ZM99.123 72.896C100.489 72.896 101.597 73.3522 102.512 74.2671L103.926 72.8529C102.622 71.5491 101 70.896 99.123 70.896V72.896ZM102.539 74.2928C103.519 75.2031 104.011 76.3407 104.011 77.784H106.011C106.011 75.8139 105.308 74.1355 103.899 72.8272L102.539 74.2928ZM104.011 77.784V81.112H106.011V77.784H104.011ZM104.011 81.112C104.011 82.4559 103.528 83.613 102.512 84.6289L103.926 86.0431C105.3 84.6697 106.011 83.0107 106.011 81.112H104.011ZM102.512 84.6289C101.597 85.5438 100.489 86 99.123 86V88C101 88 102.622 87.3469 103.926 86.0431L102.512 84.6289ZM99.123 86H81.331V88H99.123V86ZM81.331 86C77.6654 86 74.5444 84.7357 71.9151 82.1861L70.5229 83.6219C73.5256 86.5336 77.146 88 81.331 88V86ZM71.9261 82.1969C69.2991 79.5699 67.995 76.4116 67.995 72.664H65.995C65.995 76.9378 67.5069 80.6061 70.5119 83.6111L71.9261 82.1969ZM67.995 72.664V35.032H65.995V72.664H67.995ZM67.995 35.032C67.995 32.556 68.5917 30.3465 69.7725 28.3785L68.0575 27.3495C66.6783 29.6482 65.995 32.2174 65.995 35.032H67.995ZM69.7573 28.4031C71.0409 26.3973 72.679 24.8006 74.6775 23.6015L73.6485 21.8865C71.3803 23.2474 69.5197 25.064 68.0727 27.3249L69.7573 28.4031ZM74.7021 23.5863C76.6671 22.3286 78.8678 21.696 81.331 21.696V19.696C78.5035 19.696 75.9256 20.4287 73.6239 21.9017L74.7021 23.5863ZM81.331 21.696H99.123V19.696H81.331V21.696ZM99.123 21.696C101.586 21.696 103.787 22.3286 105.752 23.5863L106.83 21.9017C104.528 20.4287 101.95 19.696 99.123 19.696V21.696ZM105.777 23.6015C107.769 24.797 109.358 26.3859 110.554 28.3785L112.268 27.3495C110.904 25.0754 109.08 23.251 106.805 21.8865L105.777 23.6015ZM110.554 28.3785C111.734 30.3465 112.331 32.556 112.331 35.032H114.331C114.331 32.2174 113.648 29.6482 112.268 27.3495L110.554 28.3785ZM112.331 35.032V48.984H114.331V35.032H112.331ZM99.227 46.424V37.72H97.227V46.424H99.227ZM99.227 37.72C99.227 36.8815 98.8572 36.1756 98.2117 35.6591L96.9623 37.2209C97.1701 37.3871 97.227 37.5345 97.227 37.72H99.227ZM98.2941 35.7329C97.7921 35.2309 97.1626 34.928 96.435 34.928V36.928C96.5608 36.928 96.6992 36.9665 96.8799 37.1471L98.2941 35.7329ZM96.435 34.928H84.019V36.928H96.435V34.928ZM84.019 34.928C83.3081 34.928 82.6678 35.2164 82.1143 35.6591L83.3637 37.2209C83.6636 36.981 83.8766 36.928 84.019 36.928V34.928ZM82.0319 35.7329C81.4908 36.274 81.227 36.9606 81.227 37.72H83.227C83.227 37.4554 83.3046 37.2886 83.4461 37.1471L82.0319 35.7329ZM81.227 37.72V46.424H83.227V37.72H81.227ZM81.227 46.424C81.227 47.1241 81.5816 47.7048 82.0319 48.1551L83.4461 46.7409C83.3323 46.627 83.2759 46.5417 83.2494 46.4888C83.2367 46.4633 83.2314 46.4463 83.2291 46.4375C83.227 46.429 83.227 46.4251 83.227 46.424H81.227ZM82.1143 48.2289C82.6678 48.6716 83.3081 48.96 84.019 48.96V46.96C83.8766 46.96 83.6636 46.907 83.3637 46.6671L82.1143 48.2289ZM84.019 48.96H96.435V46.96H84.019V48.96ZM96.435 48.96C97.1626 48.96 97.7921 48.6571 98.2941 48.1551L96.8799 46.7409C96.6992 46.9215 96.5608 46.96 96.435 46.96V48.96ZM98.2117 48.2289C98.7334 47.8115 99.227 47.2136 99.227 46.424H97.227C97.227 46.3759 97.2444 46.3654 97.219 46.406C97.1892 46.4537 97.1169 46.5434 96.9623 46.6671L98.2117 48.2289ZM168.417 85.336L169.124 86.0431L169.137 86.03L169.15 86.0165L168.417 85.336ZM156.641 85.336L155.908 86.0165L155.921 86.03L155.934 86.0431L156.641 85.336ZM154.337 36.44L153.63 37.1471L153.669 37.1863L153.712 37.2209L154.337 36.44ZM139.489 36.44L138.864 35.6591L138.821 35.6937L138.782 35.7329L139.489 36.44ZM137.313 85.336L138.02 86.0431L138.033 86.03L138.046 86.0165L137.313 85.336ZM125.409 85.336L124.676 86.0165L124.701 86.0436L124.729 86.0688L125.409 85.336ZM125.665 27.864L124.813 27.3399L124.808 27.3495L125.665 27.864ZM130.913 22.616L130.399 21.7585L130.399 21.7585L130.913 22.616ZM163.041 22.616L162.527 23.4735L162.527 23.4735L163.041 22.616ZM168.161 27.864L167.295 28.3637L167.299 28.3711L167.304 28.3785L168.161 27.864ZM169.081 81.112C169.081 82.4794 168.623 83.6447 167.684 84.6555L169.15 86.0165C170.43 84.638 171.081 82.9873 171.081 81.112H169.081ZM167.71 84.6289C166.795 85.5438 165.687 86 164.321 86V88C166.198 88 167.82 87.3469 169.124 86.0431L167.71 84.6289ZM164.321 86H160.737V88H164.321V86ZM160.737 86C159.371 86 158.263 85.5438 157.348 84.6289L155.934 86.0431C157.238 87.3469 158.86 88 160.737 88V86ZM157.374 84.6555C156.435 83.6447 155.977 82.4794 155.977 81.112H153.977C153.977 82.9873 154.628 84.638 155.908 86.0165L157.374 84.6555ZM155.977 81.112V37.72H153.977V81.112H155.977ZM155.977 37.72C155.977 36.8815 155.607 36.1756 154.962 35.6591L153.712 37.2209C153.92 37.3871 153.977 37.5345 153.977 37.72H155.977ZM155.044 35.7329C154.542 35.2309 153.913 34.928 153.185 34.928V36.928C153.311 36.928 153.449 36.9665 153.63 37.1471L155.044 35.7329ZM153.185 34.928H140.769V36.928H153.185V34.928ZM140.769 34.928C140.058 34.928 139.418 35.2164 138.864 35.6591L140.114 37.2209C140.414 36.981 140.627 36.928 140.769 36.928V34.928ZM138.782 35.7329C138.241 36.274 137.977 36.9606 137.977 37.72H139.977C139.977 37.4554 140.055 37.2886 140.196 37.1471L138.782 35.7329ZM137.977 37.72V81.112H139.977V37.72H137.977ZM137.977 81.112C137.977 82.4794 137.519 83.6447 136.58 84.6555L138.046 86.0165C139.326 84.638 139.977 82.9873 139.977 81.112H137.977ZM136.606 84.6289C135.691 85.5438 134.583 86 133.217 86V88C135.094 88 136.716 87.3469 138.02 86.0431L136.606 84.6289ZM133.217 86H129.633V88H133.217V86ZM129.633 86C128.266 86 127.1 85.5418 126.089 84.6032L124.729 86.0688C126.107 87.3488 127.758 88 129.633 88V86ZM126.142 84.6555C125.203 83.6447 124.745 82.4794 124.745 81.112H122.745C122.745 82.9873 123.396 84.638 124.676 86.0165L126.142 84.6555ZM124.745 81.112V35.032H122.745V81.112H124.745ZM124.745 35.032C124.745 32.556 125.342 30.3465 126.522 28.3785L124.808 27.3495C123.428 29.6482 122.745 32.2174 122.745 35.032H124.745ZM126.517 28.3881C127.802 26.2993 129.438 24.6671 131.427 23.4735L130.399 21.7585C128.121 23.1249 126.259 24.9913 124.813 27.3399L126.517 28.3881ZM131.427 23.4735C133.395 22.2927 135.605 21.696 138.081 21.696V19.696C135.266 19.696 132.697 20.3793 130.399 21.7585L131.427 23.4735ZM138.081 21.696H155.873V19.696H138.081V21.696ZM155.873 21.696C158.349 21.696 160.559 22.2927 162.527 23.4735L163.555 21.7585C161.257 20.3793 158.688 19.696 155.873 19.696V21.696ZM162.527 23.4735C164.51 24.6634 166.097 26.2877 167.295 28.3637L169.027 27.3643C167.665 25.0029 165.839 23.1286 163.555 21.7585L162.527 23.4735ZM167.304 28.3785C168.484 30.3465 169.081 32.556 169.081 35.032H171.081C171.081 32.2174 170.398 29.6482 169.018 27.3495L167.304 28.3785ZM169.081 35.032V81.112H171.081V35.032H169.081ZM222.607 82.904L223.314 83.6111L223.314 83.6111L222.607 82.904ZM184.719 82.904L184.012 83.6111L184.017 83.6165L184.023 83.6219L184.719 82.904ZM182.415 27.864L181.563 27.3399L181.558 27.3495L182.415 27.864ZM187.663 22.616L187.149 21.7585L187.149 21.7585L187.663 22.616ZM219.791 22.616L219.277 23.4735L219.277 23.4735L219.791 22.616ZM224.911 27.864L224.045 28.3637L224.049 28.3711L224.054 28.3785L224.911 27.864ZM211.087 36.44L210.38 37.1471L210.419 37.1863L210.462 37.2209L211.087 36.44ZM196.239 36.44L195.614 35.6591L195.571 35.6937L195.532 35.7329L196.239 36.44ZM196.239 71.384L195.532 72.0911L195.571 72.1303L195.614 72.1649L196.239 71.384ZM211.087 71.384L210.462 70.6031L210.419 70.6377L210.38 70.6769L211.087 71.384ZM225.831 72.664C225.831 76.4116 224.527 79.5699 221.9 82.1969L223.314 83.6111C226.319 80.6061 227.831 76.9378 227.831 72.664H225.831ZM221.9 82.1969C219.36 84.7366 216.288 86 212.623 86V88C216.809 88 220.392 86.5327 223.314 83.6111L221.9 82.1969ZM212.623 86H194.831V88H212.623V86ZM194.831 86C191.165 86 188.044 84.7357 185.415 82.1861L184.023 83.6219C187.026 86.5336 190.646 88 194.831 88V86ZM185.426 82.1969C182.799 79.5699 181.495 76.4116 181.495 72.664H179.495C179.495 76.9378 181.007 80.6061 184.012 83.6111L185.426 82.1969ZM181.495 72.664V35.032H179.495V72.664H181.495ZM181.495 35.032C181.495 32.556 182.092 30.3465 183.272 28.3785L181.558 27.3495C180.178 29.6482 179.495 32.2174 179.495 35.032H181.495ZM183.267 28.3881C184.552 26.2993 186.188 24.6671 188.177 23.4735L187.149 21.7585C184.871 23.1249 183.009 24.9913 181.563 27.3399L183.267 28.3881ZM188.177 23.4735C190.145 22.2927 192.355 21.696 194.831 21.696V19.696C192.016 19.696 189.447 20.3793 187.149 21.7585L188.177 23.4735ZM194.831 21.696H212.623V19.696H194.831V21.696ZM212.623 21.696C215.099 21.696 217.309 22.2927 219.277 23.4735L220.305 21.7585C218.007 20.3793 215.438 19.696 212.623 19.696V21.696ZM219.277 23.4735C221.26 24.6634 222.847 26.2877 224.045 28.3637L225.777 27.3643C224.415 25.0029 222.589 23.1286 220.305 21.7585L219.277 23.4735ZM224.054 28.3785C225.234 30.3465 225.831 32.556 225.831 35.032H227.831C227.831 32.2174 227.148 29.6482 225.768 27.3495L224.054 28.3785ZM225.831 35.032V72.664H227.831V35.032H225.831ZM212.727 70.232V37.72H210.727V70.232H212.727ZM212.727 37.72C212.727 36.8815 212.357 36.1756 211.712 35.6591L210.462 37.2209C210.67 37.3871 210.727 37.5345 210.727 37.72H212.727ZM211.794 35.7329C211.292 35.2309 210.663 34.928 209.935 34.928V36.928C210.061 36.928 210.199 36.9665 210.38 37.1471L211.794 35.7329ZM209.935 34.928H197.519V36.928H209.935V34.928ZM197.519 34.928C196.808 34.928 196.168 35.2164 195.614 35.6591L196.864 37.2209C197.164 36.981 197.377 36.928 197.519 36.928V34.928ZM195.532 35.7329C194.991 36.274 194.727 36.9606 194.727 37.72H196.727C196.727 37.4554 196.805 37.2886 196.946 37.1471L195.532 35.7329ZM194.727 37.72V70.232H196.727V37.72H194.727ZM194.727 70.232C194.727 70.9596 195.03 71.5891 195.532 72.0911L196.946 70.6769C196.765 70.4962 196.727 70.3578 196.727 70.232H194.727ZM195.614 72.1649C196.168 72.6076 196.808 72.896 197.519 72.896V70.896C197.377 70.896 197.164 70.843 196.864 70.6031L195.614 72.1649ZM197.519 72.896H209.935V70.896H197.519V72.896ZM209.935 72.896C210.663 72.896 211.292 72.5931 211.794 72.0911L210.38 70.6769C210.199 70.8575 210.061 70.896 209.935 70.896V72.896ZM211.712 72.1649C212.303 71.6917 212.727 71.0444 212.727 70.232H210.727C210.727 70.2729 210.724 70.3937 210.462 70.6031L211.712 72.1649ZM281.917 85.336L282.624 86.0431L282.637 86.03L282.65 86.0165L281.917 85.336ZM270.141 85.336L269.408 86.0165L269.421 86.03L269.434 86.0431L270.141 85.336ZM267.837 36.44L267.13 37.1471L267.169 37.1863L267.212 37.2209L267.837 36.44ZM252.989 36.44L252.364 35.6591L252.321 35.6937L252.282 35.7329L252.989 36.44ZM250.813 85.336L251.52 86.0431L251.533 86.03L251.546 86.0165L250.813 85.336ZM238.909 85.336L238.176 86.0165L238.201 86.0436L238.229 86.0688L238.909 85.336ZM239.165 27.864L238.313 27.3399L238.308 27.3495L239.165 27.864ZM244.413 22.616L243.899 21.7585L243.899 21.7585L244.413 22.616ZM276.541 22.616L276.027 23.4735L276.027 23.4735L276.541 22.616ZM281.661 27.864L280.795 28.3637L280.799 28.3711L280.804 28.3785L281.661 27.864ZM282.581 81.112C282.581 82.4794 282.123 83.6447 281.184 84.6555L282.65 86.0165C283.93 84.638 284.581 82.9873 284.581 81.112H282.581ZM281.21 84.6289C280.295 85.5438 279.187 86 277.821 86V88C279.698 88 281.32 87.3469 282.624 86.0431L281.21 84.6289ZM277.821 86H274.237V88H277.821V86ZM274.237 86C272.871 86 271.763 85.5438 270.848 84.6289L269.434 86.0431C270.738 87.3469 272.36 88 274.237 88V86ZM270.874 84.6555C269.935 83.6447 269.477 82.4794 269.477 81.112H267.477C267.477 82.9873 268.128 84.638 269.408 86.0165L270.874 84.6555ZM269.477 81.112V37.72H267.477V81.112H269.477ZM269.477 37.72C269.477 36.8815 269.107 36.1756 268.462 35.6591L267.212 37.2209C267.42 37.3871 267.477 37.5345 267.477 37.72H269.477ZM268.544 35.7329C268.042 35.2309 267.413 34.928 266.685 34.928V36.928C266.811 36.928 266.949 36.9665 267.13 37.1471L268.544 35.7329ZM266.685 34.928H254.269V36.928H266.685V34.928ZM254.269 34.928C253.558 34.928 252.918 35.2164 252.364 35.6591L253.614 37.2209C253.914 36.981 254.127 36.928 254.269 36.928V34.928ZM252.282 35.7329C251.741 36.274 251.477 36.9606 251.477 37.72H253.477C253.477 37.4554 253.555 37.2886 253.696 37.1471L252.282 35.7329ZM251.477 37.72V81.112H253.477V37.72H251.477ZM251.477 81.112C251.477 82.4794 251.019 83.6447 250.08 84.6555L251.546 86.0165C252.826 84.638 253.477 82.9873 253.477 81.112H251.477ZM250.106 84.6289C249.191 85.5438 248.083 86 246.717 86V88C248.594 88 250.216 87.3469 251.52 86.0431L250.106 84.6289ZM246.717 86H243.133V88H246.717V86ZM243.133 86C241.766 86 240.6 85.5418 239.589 84.6032L238.229 86.0688C239.607 87.3488 241.258 88 243.133 88V86ZM239.642 84.6555C238.703 83.6447 238.245 82.4794 238.245 81.112H236.245C236.245 82.9873 236.896 84.638 238.176 86.0165L239.642 84.6555ZM238.245 81.112V35.032H236.245V81.112H238.245ZM238.245 35.032C238.245 32.556 238.842 30.3465 240.022 28.3785L238.308 27.3495C236.928 29.6482 236.245 32.2174 236.245 35.032H238.245ZM240.017 28.3881C241.302 26.2993 242.938 24.6671 244.927 23.4735L243.899 21.7585C241.621 23.1249 239.759 24.9913 238.313 27.3399L240.017 28.3881ZM244.927 23.4735C246.895 22.2927 249.105 21.696 251.581 21.696V19.696C248.766 19.696 246.197 20.3793 243.899 21.7585L244.927 23.4735ZM251.581 21.696H269.373V19.696H251.581V21.696ZM269.373 21.696C271.849 21.696 274.059 22.2927 276.027 23.4735L277.055 21.7585C274.757 20.3793 272.188 19.696 269.373 19.696V21.696ZM276.027 23.4735C278.01 24.6634 279.597 26.2877 280.795 28.3637L282.527 27.3643C281.165 25.0029 279.339 23.1286 277.055 21.7585L276.027 23.4735ZM280.804 28.3785C281.984 30.3465 282.581 32.556 282.581 35.032H284.581C284.581 32.2174 283.898 29.6482 282.518 27.3495L280.804 28.3785ZM282.581 35.032V81.112H284.581V35.032H282.581Z"
          fill="black"
        />
        <defs>
          <linearGradient
            id="paint0_linear_1_2"
            x1="-73.0572"
            y1="54"
            x2="339.346"
            y2="31.6136"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0.342362" stopColor="#7B04C4" />
            <stop offset="0.944315" stopColor="#1F0AA0" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  )
}
