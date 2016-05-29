using Authentication.Models;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Hosting;
using System.Web.Http;
using System.Xml.Serialization;

namespace Authentication.Controllers
{
    public class FlowersController : ApiController
    {

        // GET: api/flowers

        [Authorize]       
        public IEnumerable<Flower> Get()
        {
            XmlSerializer serializer = new XmlSerializer(typeof(List<Flower>));
            TextReader textReader = new StreamReader(HostingEnvironment.MapPath("/databases/allflowers.xml"));
            List<Models.Flower> allFlowers = (List<Flower>)serializer.Deserialize(textReader);
            textReader.Close();
            return allFlowers;
        }

        // GET: api/Default/5
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/Default
        public void Post([FromBody]string value)
        {
        }

        // PUT: api/Default/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/Default/5
        public void Delete(int id)
        {
        }


    }
}
