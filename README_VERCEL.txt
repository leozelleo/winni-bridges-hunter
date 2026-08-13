
VERCEL.ZIP - FREE HOSTING, NO DASHBOARD HUNTING, LIVE LAKE LEVEL

WHY VERCEL (when Cloudflare Pages not visible):
- Free 100GB bandwidth
- Free Functions (live lake level)
- No dashboard needed - deploy from terminal in 1 command
- Auto GitHub deploys
- Same as Netlify but faster

DEPLOY IN 1 COMMAND (NO DASHBOARD):

cd ~/Downloads/winnipesaukee_deploy
unzip -o ~/Downloads/vercel.zip

npm i -g vercel
vercel --prod

# First time: it asks
# - Set up and deploy? Y
# - Which scope? Your account
# - Link to existing project? N (or Y if you have one)
# - Project name? winnipesaukee
# - Directory? ./ (enter)
# - Override settings? N

# Done! URL: https://winnipesaukee.vercel.app
# Live level: https://winnipesaukee.vercel.app/lakelevel
# Or https://winnipesaukee.vercel.app/api/lakelevel

GITHUB AUTO-DEPLOY:
vercel --prod --yes
# Then: vercel dashboard -> Project -> Settings -> Git -> Connect GitHub repo winnipesaukee_deploy
# Every git push auto-deploys

ALSO WORKS ON:
- Netlify Drop: drag index.html + images + api folder to https://app.netlify.com/drop (free)
- GitHub Pages: rm -rf api && git push (no live level, seasonal estimate only)
- Render, Firebase, etc - all support api/lakelevel.js as serverless function

LIVE LAKE LEVEL:
USGS 01080000 LAKE WINNIPESAUKEE AT WEIRS BEACH, NH - official gauge at Endicott Park per NH RSA 482:84
Fetches https://waterservices.usgs.gov/nwis/iv/?format=json&sites=01080000&parameterCd=00065
