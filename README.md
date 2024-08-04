#To run
  - clone branch using git clone -b supabas_temp "https://github.com/Rtvk-001/repped-website/edit/supabas_temp"
  - npm start/run dev
#changes
  - Supabase integrated
  - tables cart, products added, images loaded directly from supabase , removed lcoal 'db' variable
  - fixed cart refresh and permanent null on navbar
  - Cannot enter swipeNow page without logging in
#Issues
  - The swipenow page still loads, checks for session existence, then redirects [dosen't look good]
  - create a logout option
  - cards repeat once added in the cart and refreshed [is it okay?] [data insingnificancy]
  - Login option in navbar after logging in [should probably be removed]
  - Redesign Login and SignUp pages.
  - description and price for each card show upon the image [comment it out or place it elsewhere]
