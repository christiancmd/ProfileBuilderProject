export default function Footer() {
  
  const year = new Date().getFullYear();

  return (
    <footer className="bg-white py-10">
        <div className="flex justify-around items-center text-teal-950 ">
            <p>© {year} Profile Builder. All rights reserved.</p>
            <h3>Contact: <span>pariscachristian@gmail.com</span></h3>
        </div>
    </footer>
  )
}

