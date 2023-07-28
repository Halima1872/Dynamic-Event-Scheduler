import './Welcome.css'
export default function Welcome() {
    
        function daysInCurrentMonth() {
            var now = new Date();
            return new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
         }
         
         let a = daysInCurrentMonth();
         const currMonth = new Date().toLocaleString([], {
            month: 'long',
          });
         
         const renderTD = () => {
           let td = [];
           for (let i = 1; i <= a; i++) {
             td.push(<td key={i}>{i} </td>);
             if (i % 7 === 0) {
               td.push(<tr key={i}></tr>);
             }
           }
           return td;
         };
         
         return (
           <div>
            <h1>Welcome, {localStorage.getItem('CurrentUser')}</h1>
            <h2>Calendar for Month: {currMonth} </h2>
             <table>
               <tbody>
                 <tr>{renderTD()}</tr>
               </tbody>
             </table>
           </div>
         );
        
}