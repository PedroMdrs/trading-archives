import React from "react";

const Logo = ({ fill }) => {
  console.log(fill);
  return (
    <svg
      width="203"
      height="50"
      viewBox="0 0 203 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M79.672 2.54V5.144H74.492V22H71.3V5.144H66.092V2.54H79.672ZM93.0127 22L88.5327 14.216H86.0967V22H82.9047V2.54H89.6247C91.118 2.54 92.378 2.80133 93.4047 3.324C94.45 3.84666 95.2247 4.54666 95.7287 5.424C96.2514 6.30133 96.5127 7.28133 96.5127 8.364C96.5127 9.63333 96.1394 10.7907 95.3927 11.836C94.6647 12.8627 93.5354 13.5627 92.0047 13.936L96.8207 22H93.0127ZM86.0967 11.668H89.6247C90.8194 11.668 91.7154 11.3693 92.3127 10.772C92.9287 10.1747 93.2367 9.372 93.2367 8.364C93.2367 7.356 92.938 6.572 92.3407 6.012C91.7434 5.43333 90.838 5.144 89.6247 5.144H86.0967V11.668ZM112.328 18.024H104.18L102.78 22H99.4481L106.42 2.512H110.116L117.088 22H113.728L112.328 18.024ZM111.432 15.42L108.268 6.376L105.076 15.42H111.432ZM126.476 2.54C128.548 2.54 130.358 2.94133 131.908 3.744C133.476 4.528 134.68 5.66666 135.52 7.16C136.378 8.63466 136.808 10.3613 136.808 12.34C136.808 14.3187 136.378 16.036 135.52 17.492C134.68 18.948 133.476 20.068 131.908 20.852C130.358 21.6173 128.548 22 126.476 22H120.12V2.54H126.476ZM126.476 19.396C128.753 19.396 130.498 18.78 131.712 17.548C132.925 16.316 133.532 14.58 133.532 12.34C133.532 10.0813 132.925 8.31733 131.712 7.048C130.498 5.77866 128.753 5.144 126.476 5.144H123.312V19.396H126.476ZM143.163 2.54V22H139.971V2.54H143.163ZM163.342 22H160.15L150.546 7.468V22H147.354V2.512H150.546L160.15 17.016V2.512H163.342V22ZM181.618 8.14C181.114 7.16933 180.414 6.44133 179.518 5.956C178.622 5.452 177.586 5.2 176.41 5.2C175.122 5.2 173.974 5.48933 172.966 6.068C171.958 6.64666 171.164 7.468 170.586 8.532C170.026 9.596 169.746 10.828 169.746 12.228C169.746 13.628 170.026 14.8693 170.586 15.952C171.164 17.016 171.958 17.8373 172.966 18.416C173.974 18.9947 175.122 19.284 176.41 19.284C178.146 19.284 179.555 18.7987 180.638 17.828C181.72 16.8573 182.383 15.5413 182.626 13.88H175.318V11.332H186.042V13.824C185.836 15.336 185.295 16.7267 184.418 17.996C183.559 19.2653 182.43 20.2827 181.03 21.048C179.648 21.7947 178.108 22.168 176.41 22.168C174.58 22.168 172.91 21.748 171.398 20.908C169.886 20.0493 168.682 18.864 167.786 17.352C166.908 15.84 166.47 14.132 166.47 12.228C166.47 10.324 166.908 8.616 167.786 7.104C168.682 5.592 169.886 4.416 171.398 3.576C172.928 2.71733 174.599 2.288 176.41 2.288C178.482 2.288 180.32 2.80133 181.926 3.828C183.55 4.836 184.726 6.27333 185.454 8.14H181.618ZM78.832 43.024H70.684L69.284 47H65.952L72.924 27.512H76.62L83.592 47H80.232L78.832 43.024ZM77.936 40.42L74.772 31.376L71.58 40.42H77.936ZM96.7314 47L92.2514 39.216H89.8154V47H86.6234V27.54H93.3434C94.8368 27.54 96.0968 27.8013 97.1234 28.324C98.1688 28.8467 98.9434 29.5467 99.4474 30.424C99.9701 31.3013 100.231 32.2813 100.231 33.364C100.231 34.6333 99.8581 35.7907 99.1114 36.836C98.3834 37.8627 97.2541 38.5627 95.7234 38.936L100.539 47H96.7314ZM89.8154 36.668H93.3434C94.5381 36.668 95.4341 36.3693 96.0314 35.772C96.6474 35.1747 96.9554 34.372 96.9554 33.364C96.9554 32.356 96.6568 31.572 96.0594 31.012C95.4621 30.4333 94.5568 30.144 93.3434 30.144H89.8154V36.668ZM103.251 37.228C103.251 35.324 103.69 33.616 104.567 32.104C105.463 30.592 106.667 29.416 108.179 28.576C109.71 27.7173 111.38 27.288 113.191 27.288C115.263 27.288 117.102 27.8013 118.707 28.828C120.331 29.836 121.507 31.2733 122.235 33.14H118.399C117.895 32.1133 117.195 31.348 116.299 30.844C115.403 30.34 114.367 30.088 113.191 30.088C111.903 30.088 110.755 30.3773 109.747 30.956C108.739 31.5347 107.946 32.3653 107.367 33.448C106.807 34.5307 106.527 35.7907 106.527 37.228C106.527 38.6653 106.807 39.9253 107.367 41.008C107.946 42.0907 108.739 42.9307 109.747 43.528C110.755 44.1067 111.903 44.396 113.191 44.396C114.367 44.396 115.403 44.144 116.299 43.64C117.195 43.136 117.895 42.3707 118.399 41.344H122.235C121.507 43.2107 120.331 44.648 118.707 45.656C117.102 46.664 115.263 47.168 113.191 47.168C111.362 47.168 109.691 46.748 108.179 45.908C106.667 45.0493 105.463 43.864 104.567 42.352C103.69 40.84 103.251 39.132 103.251 37.228ZM141.511 27.54V47H138.319V38.488H129.163V47H125.971V27.54H129.163V35.884H138.319V27.54H141.511ZM148.905 27.54V47H145.713V27.54H148.905ZM169.868 27.54L162.56 47H158.864L151.528 27.54H154.944L160.712 43.724L166.508 27.54H169.868ZM175.73 30.116V35.828H182.45V38.432H175.73V44.396H183.29V47H172.538V27.512H183.29V30.116H175.73ZM193.633 47.196C192.326 47.196 191.15 46.972 190.105 46.524C189.06 46.0573 188.238 45.404 187.641 44.564C187.044 43.724 186.745 42.744 186.745 41.624H190.161C190.236 42.464 190.562 43.1547 191.141 43.696C191.738 44.2373 192.569 44.508 193.633 44.508C194.734 44.508 195.593 44.2467 196.209 43.724C196.825 43.1827 197.133 42.492 197.133 41.652C197.133 40.9987 196.937 40.4667 196.545 40.056C196.172 39.6453 195.696 39.328 195.117 39.104C194.557 38.88 193.773 38.6373 192.765 38.376C191.496 38.04 190.46 37.704 189.657 37.368C188.873 37.0133 188.201 36.472 187.641 35.744C187.081 35.016 186.801 34.0453 186.801 32.832C186.801 31.712 187.081 30.732 187.641 29.892C188.201 29.052 188.985 28.408 189.993 27.96C191.001 27.512 192.168 27.288 193.493 27.288C195.378 27.288 196.918 27.764 198.113 28.716C199.326 29.6493 199.998 30.9373 200.129 32.58H196.601C196.545 31.8707 196.209 31.264 195.593 30.76C194.977 30.256 194.165 30.004 193.157 30.004C192.242 30.004 191.496 30.2373 190.917 30.704C190.338 31.1707 190.049 31.8427 190.049 32.72C190.049 33.3173 190.226 33.812 190.581 34.204C190.954 34.5773 191.421 34.876 191.981 35.1C192.541 35.324 193.306 35.5667 194.277 35.828C195.565 36.1827 196.61 36.5373 197.413 36.892C198.234 37.2467 198.925 37.7973 199.485 38.544C200.064 39.272 200.353 40.252 200.353 41.484C200.353 42.4733 200.082 43.4067 199.541 44.284C199.018 45.1613 198.244 45.8707 197.217 46.412C196.209 46.9347 195.014 47.196 193.633 47.196Z"
        fill={fill}
      />
      <path
        d="M47.082 13.857L48.1351 12.7888C47.8334 12.4914 47.4201 12.3355 46.9971 12.3594C46.5742 12.3834 46.1811 12.5851 45.915 12.9147L47.082 13.857ZM27.5993 9.64853L29.0782 9.89941L27.5993 9.64853ZM13.5537 28.9206L12.3801 29.8548L13.5537 28.9206ZM10.4954 21.2921L11.9645 20.9894C11.8289 20.3309 11.2716 19.8431 10.601 19.7958C9.93031 19.7484 9.31007 20.1531 9.08328 20.7861L10.4954 21.2921ZM2 45H0.5C0.5 45.8284 1.17157 46.5 2 46.5L2 45ZM4.26543 46.5H55V43.5H4.26543V46.5ZM45.915 12.9147C45.1246 13.8936 44.7643 14.9729 44.5389 15.9562C44.4274 16.4425 44.3423 16.9379 44.2636 17.3878C44.1824 17.8518 44.1061 18.2792 44.0067 18.7C43.8112 19.528 43.5399 20.2665 43.0487 20.9511C42.5608 21.6311 41.7965 22.3401 40.5021 23.0104L41.8817 25.6744C43.5324 24.8196 44.6838 23.8183 45.4862 22.7C46.2853 21.5862 46.6788 20.4384 46.9265 19.3894C47.0487 18.8716 47.1386 18.3628 47.2187 17.9049C47.3013 17.433 47.3726 17.0211 47.463 16.6265C47.6414 15.8483 47.8672 15.2723 48.2491 14.7994L45.915 12.9147ZM40.5021 23.0104C39.9757 23.2831 39.1468 23.2282 37.7111 21.816C36.3552 20.4823 34.9742 18.4012 33.6856 16.1895C33.0498 15.0982 32.4526 14.0037 31.9043 12.9889C31.3618 11.9848 30.8564 11.0382 30.4247 10.2841C30.0253 9.5863 29.5847 8.86056 29.1625 8.43443C29.0463 8.31722 28.8656 8.15326 28.6251 8.02502C28.3872 7.8982 27.9341 7.72636 27.387 7.87341C26.8197 8.02588 26.5039 8.42433 26.354 8.69763C26.2105 8.95925 26.1506 9.2198 26.1205 9.39764L29.0782 9.89941C29.0782 9.89947 29.0774 9.90416 29.0754 9.91282C29.0735 9.92141 29.07 9.93555 29.0642 9.95426C29.0538 9.98859 29.0306 10.0561 28.9843 10.1404C28.8936 10.3058 28.6494 10.6406 28.1657 10.7706C27.7022 10.8952 27.3447 10.7421 27.2138 10.6723C27.1404 10.6332 27.0913 10.5964 27.0676 10.5775C27.0546 10.5671 27.0453 10.5589 27.0398 10.5539C27.037 10.5514 27.0349 10.5494 27.0336 10.5481C27.0323 10.5468 27.0316 10.5461 27.0315 10.5461C27.0315 10.546 27.0335 10.5481 27.0377 10.5527C27.0418 10.5572 27.0475 10.5637 27.0549 10.5723C27.0699 10.59 27.0895 10.6142 27.1139 10.6463C27.1634 10.7113 27.2243 10.7975 27.2972 10.9083C27.4441 11.1311 27.6182 11.42 27.8211 11.7744C28.2289 12.4869 28.7082 13.3846 29.2649 14.4149C29.8158 15.4345 30.4321 16.5644 31.0934 17.6997C32.3992 19.941 33.9468 22.3214 35.6073 23.9547C37.1879 25.5094 39.4631 26.927 41.8817 25.6744L40.5021 23.0104ZM26.1205 9.39764C24.9936 16.0399 23.1857 22.738 20.9289 26.6964C19.7684 28.732 18.7002 29.6645 17.8777 29.874C17.2715 30.0284 16.2469 29.8955 14.7273 27.9864L12.3801 29.8548C14.2005 32.1417 16.3185 33.367 18.6182 32.7812C20.7015 32.2505 22.3025 30.3444 23.5351 28.1822C26.0648 23.745 27.9396 16.6111 29.0782 9.89941L26.1205 9.39764ZM14.7273 27.9864C13.9031 26.9511 13.2048 25.2655 12.6998 23.7006C12.4554 22.9434 12.2701 22.2591 12.1461 21.7647C12.0842 21.5181 12.038 21.3201 12.0076 21.1857C11.9924 21.1186 11.9812 21.0674 11.974 21.034C11.9704 21.0173 11.9678 21.0051 11.9662 20.9976C11.9654 20.9939 11.9649 20.9913 11.9646 20.9899C11.9645 20.9892 11.9644 20.9888 11.9644 20.9887C11.9644 20.9887 11.9644 20.9887 11.9644 20.9889C11.9644 20.9889 11.9644 20.9891 11.9644 20.9891C11.9645 20.9892 11.9645 20.9894 10.4954 21.2921C9.0262 21.5947 9.02625 21.5949 9.0263 21.5952C9.02632 21.5953 9.02637 21.5955 9.02642 21.5957C9.0265 21.5962 9.02661 21.5967 9.02673 21.5972C9.02697 21.5984 9.02727 21.5999 9.02765 21.6017C9.02839 21.6052 9.02939 21.61 9.03065 21.616C9.03317 21.628 9.03674 21.6447 9.04134 21.6661C9.05054 21.7088 9.06391 21.7698 9.08141 21.8473C9.11641 22.0021 9.16806 22.2229 9.23619 22.4946C9.37218 23.0367 9.57531 23.7871 9.84476 24.622C10.3674 26.2414 11.1982 28.37 12.3801 29.8548L14.7273 27.9864ZM2 46.5H4.26543V43.5H2V46.5ZM3.5 45V0H0.5V45H3.5ZM9.08328 20.7861L0.587921 44.494L3.41208 45.506L11.9074 21.7981L9.08328 20.7861ZM46.029 14.9253L53.947 22.7307L56.053 20.5943L48.1351 12.7888L46.029 14.9253Z"
        fill={fill}
      />
    </svg>
  );
};

export default Logo;
